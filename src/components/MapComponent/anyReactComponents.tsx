// src/components/AnyReactComponent.tsx
import React from 'react';

interface AnyReactComponentProps {
  lat: number;
  lng: number;
  text: string;
  color: string;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text, color }) => {
  const pinStyle = {
    color: '#fff',
    backgroundColor: color || '#000', // Ensure a default color
    padding: '10px 15px',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px', // Adjust width and height to suit your needs
    height: '30px',
  };

  return (
    <div style={pinStyle}>
      {text}
    </div>
  );
};

export default AnyReactComponent;
