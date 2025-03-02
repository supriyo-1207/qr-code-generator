export const getInputLabelByType = (type) => {
  switch(type) {
    case 'link': return 'Website URL';
    case 'phone': return 'Phone Number';
    case 'text': return 'Text Content';
    case 'address': return 'Address Details';
    default: return 'Content';
  }
};

export const getPlaceholderByType = (type) => {
  switch(type) {
    case 'link': return 'https://yourwebsite.com';
    case 'phone': return '+1 (555) 123-4567';
    case 'text': return 'Enter your text here';
    case 'address': return '123 Main St, City, Country';
    default: return '';
  }
};

export const formatQRValue = (value, type) => {
  switch(type) {
    case 'link':
      // Ensure URL has protocol
      if (!value.startsWith('http://') && !value.startsWith('https://')) {
        return 'https://' + value;
      }
      return value;
    case 'phone':
      // Format as tel: URI
      return 'tel:' + value.replace(/[^0-9+]/g, '');
    case 'text':
      return value;
    case 'address':
      // Simply encode the address
      return value;
    default:
      return value;
  }
};