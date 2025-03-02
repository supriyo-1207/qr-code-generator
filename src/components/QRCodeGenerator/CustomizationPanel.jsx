import React from 'react';
import { Settings } from 'lucide-react';
import ColorPicker from './ColorPicker';

const CustomizationPanel = ({ 
  qrColor, 
  onQrColorChange, 
  bgColor, 
  onBgColorChange, 
  qrSize, 
  onQrSizeChange 
}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Customization</label>
        <Settings size={16} className="text-gray-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ColorPicker 
          label="QR Code Color"
          color={qrColor}
          onChange={onQrColorChange}
        />
        
        <ColorPicker 
          label="Background Color"
          color={bgColor}
          onChange={onBgColorChange}
        />
      </div>
      
      <div className="mt-4">
        <label className="text-xs text-gray-600 mb-1 block">QR Code Size: {qrSize}px</label>
        <input
          type="range"
          min="100"
          max="400"
          step="10"
          value={qrSize}
          onChange={(e) => onQrSizeChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CustomizationPanel;