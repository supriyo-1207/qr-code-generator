import React from 'react';

const InputField = ({ value, onChange, label, placeholder }) => {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
    </div>
  );
};

export default InputField;
