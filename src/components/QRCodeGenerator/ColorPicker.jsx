import React from 'react';

const ColorPicker = ({ label, color, onChange }) => {
  return (
    <div>
      <label className="text-xs text-gray-600 mb-1 block">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 rounded cursor-pointer"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );
};

export default ColorPicker;