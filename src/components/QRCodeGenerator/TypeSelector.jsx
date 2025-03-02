import React from 'react';
import { Link, Phone, TextQuote, MapPin } from 'lucide-react';

const TypeSelector = ({ selectedType, onTypeChange }) => {
  const types = [
    { id: 'link', label: 'Link', icon: Link },
    { id: 'phone', label: 'Phone', icon: Phone },
    { id: 'text', label: 'Text', icon: TextQuote },
    { id: 'address', label: 'Address', icon: MapPin },
  ];

  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-gray-700 mb-2 block">Select QR Code Type</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {types.map(({ id, label, icon: Icon }) => (
          <button 
            key={id}
            onClick={() => onTypeChange(id)}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border ${
              selectedType === id 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;
