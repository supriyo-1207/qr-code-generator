import React from 'react';
import QRCode from 'react-qr-code'; // Using react-qr-code library

const QRCodeDisplay = ({ value, size, color, backgroundColor }) => {
  return (
    <QRCode 
      value={value || 'https://example.com'} 
      size={size} 
      fgColor={color}
      bgColor={backgroundColor}
      level="H" // Error correction level
      style={{ maxWidth: "100%", width: "100%", height: "auto" }}
    />
  );
};

export default QRCodeDisplay;