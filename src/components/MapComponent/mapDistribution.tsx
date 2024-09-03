import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Box, Typography, styled, Button } from '@mui/material';
import { Sales } from '../../types'; // Import the Sales type

const StyledMapContainer = styled(Box)(
  ({ theme }) => `
    height: 500px;
    width: 100%;
    background-color: #fff;
    border-radius: ${theme.shape.borderRadius}px;
    box-shadow: ${theme.shadows[1]};
    padding: ${theme.spacing(3)};
    padding-top: ${theme.spacing(5)};
    padding-bottom: ${theme.spacing(5)};
    position: relative;
  `
);

const productColors: Record<number, string> = {
  1: '#FF5733', // Example color for Product ID 1
  2: '#33FF57', // Example color for Product ID 2
  // Add more product IDs and their corresponding colors here
};

interface AnyReactComponentProps {
  lat: number;
  lng: number;
  text: string;
  color: string;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text, color }) => (
  <div style={{
    color: '#fff',
    background: color,
    padding: '10px 15px',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  }}>
    {text}
  </div>
);

interface MapDistributionProps {
  sales?: Sales[]; // Make sales optional to handle cases where it's undefined
}

export default function MapDistribution({ sales = [] }: MapDistributionProps) {
  const [center, setCenter] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });

  const defaultProps = {
    zoom: 11
  };

  useEffect(() => {
    if (sales.length > 0) {
      setCenter({
        lat: sales[0].Latitude,
        lng: sales[0].Longitude,
      });
    }
  }, [sales]);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <StyledMapContainer sx={{ mt: 3 }}>
      <Typography variant="h3" sx={{ pb: 3 }}>
        Location Map
      </Typography>
      <div style={{ height: '90%', width: '100%', position: 'relative' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCBgUnMhlMWua_5Q_QoylKalTY6HktzYz0" }}
          center={center}
          defaultZoom={defaultProps.zoom}
        >
          {sales.map((sale) => (
            <AnyReactComponent
              key={sale.ID}
              lat={sale.Latitude}
              lng={sale.Longitude}
              text={sale.Product.Name}
              color={productColors[sale.ProductID] || '#000'}
            />
          ))}
        </GoogleMapReact>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGeolocation}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        Geolocate
      </Button>
    </StyledMapContainer>
  );
}