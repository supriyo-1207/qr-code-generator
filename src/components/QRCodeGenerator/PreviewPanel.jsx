import React, { forwardRef } from 'react';
import { Download, Link, Phone, TextQuote, MapPin } from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';

const PreviewPanel = forwardRef(({ 
  isGenerated, 
  qrType, 
  qrValue,
  qrSize, 
  qrColor, 
  bgColor, 
  onDownload 
}, ref) => {
  // Get icon based on QR type
  const getTypeIcon = () => {
    switch(qrType) {
      case 'link': return <Link size={16} />;
      case 'phone': return <Phone size={16} />;
      case 'text': return <TextQuote size={16} />;
      case 'address': return <MapPin size={16} />;
      default: return null;
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-6 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 self-start">QR Code Preview</h2>
      
      <div className="flex flex-col items-center justify-center flex-grow w-full">
        {isGenerated ? (
          <div 
            ref={ref}
            className="border border-gray-200 rounded-xl p-6 flex items-center justify-center"
            style={{
              backgroundColor: bgColor,
              width: `${qrSize + 64}px`,
              height: `${qrSize + 64}px`
            }}
          >
            <QRCodeDisplay 
              value={qrValue}
              size={qrSize} 
              color={qrColor} 
              backgroundColor={bgColor} 
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 w-full h-64">
            <p className="text-gray-500 mb-2">No QR code generated yet</p>
            <p className="text-sm text-gray-400">Fill out the form and click "Generate QR Code"</p>
          </div>
        )}
      </div>
      
      {/* Download Button */}
      {isGenerated && (
        <button
          onClick={onDownload}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          Download QR Code
          <Download size={18} />
        </button>
      )}
      
      {/* Type indicator */}
      {isGenerated && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          {getTypeIcon()}
          <span className="capitalize">{qrType} QR Code</span>
        </div>
      )}
    </div>
  );
});

export default PreviewPanel;
