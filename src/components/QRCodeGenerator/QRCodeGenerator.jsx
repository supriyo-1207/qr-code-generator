import React, { useState, useRef } from 'react';
import TypeSelector from './TypeSelector';
import InputField from './InputField';
import CustomizationPanel from './CustomizationPanel';
import PreviewPanel from './PreviewPanel';
import { getInputLabelByType, getPlaceholderByType, formatQRValue } from './utils';

const QRCodeGenerator = () => {
  // State management
  const [qrType, setQrType] = useState('link');
  const [qrValue, setQrValue] = useState('https://example.com');
  const [formattedQrValue, setFormattedQrValue] = useState('https://example.com');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrSize, setQrSize] = useState(200);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const qrRef = useRef(null);
  
  const handleTypeChange = (type) => {
    setQrType(type);
    // Set default values based on type
    switch(type) {
      case 'link': setQrValue('https://example.com'); break;
      case 'phone': setQrValue('+1234567890'); break;
      case 'text': setQrValue('Sample text'); break;
      case 'address': setQrValue('123 Main St'); break;
      default: setQrValue('');
    }
    setIsGenerated(false);
  };
  
  const generateQRCode = () => {
    if (!qrValue.trim()) return;
    
    // Format the QR value based on type
    const formatted = formatQRValue(qrValue, qrType);
    setFormattedQrValue(formatted);
    setIsGenerated(true);
  };
  
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    // Create canvas from SVG for download
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    canvas.width = qrSize + 64; // Add padding
    canvas.height = qrSize + 64;
    
    img.onload = () => {
      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Center the QR code
      ctx.drawImage(img, 32, 32);
      
      // Create download link
      const a = document.createElement('a');
      a.download = `${qrType}-qr-code.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-8 p-6 min-h-screen bg-gray-50">
      {/* Input Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">QR Code Generator</h1>
        <p className="text-gray-600">Create custom QR codes for various types of information</p>
        
        <TypeSelector 
          selectedType={qrType} 
          onTypeChange={handleTypeChange} 
        />
        
        <InputField 
          value={qrValue} 
          onChange={(e) => setQrValue(e.target.value)} 
          label={getInputLabelByType(qrType)}
          placeholder={getPlaceholderByType(qrType)}
        />
        
        <CustomizationPanel
          qrColor={qrColor}
          onQrColorChange={setQrColor}
          bgColor={bgColor}
          onBgColorChange={setBgColor}
          qrSize={qrSize}
          onQrSizeChange={setQrSize}
        />
        
        <button
          onClick={generateQRCode}
          disabled={!qrValue.trim()}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Generate QR Code
        </button>
      </div>
      
      <PreviewPanel
        ref={qrRef}
        isGenerated={isGenerated}
        qrType={qrType}
        qrValue={formattedQrValue}
        qrSize={qrSize}
        qrColor={qrColor}
        bgColor={bgColor}
        onDownload={downloadQRCode}
      />
    </div>
  );
};

export default QRCodeGenerator;