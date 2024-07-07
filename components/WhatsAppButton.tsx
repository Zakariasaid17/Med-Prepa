// components/WhatsAppButton.tsx
'use client'


import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleClick} style={styles.button}>
      OBTENIR L'ACCÈS
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#25D366',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  } as React.CSSProperties,
};

export default WhatsAppButton;
