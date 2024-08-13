import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Box, Typography, styled, Button } from '@mui/material';

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

interface AnyReactComponentProps {
  lat: number;
  lng: number;
  text: string;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => (
  <div>{text}</div>
);

export default function MapDistribution() {
  const [center, setCenter] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });

  const defaultProps = {
    zoom: 11
  };

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
      <div style={{ height: '90%', width: '100%',  position: 'relative' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCBgUnMhlMWua_5Q_QoylKalTY6HktzYz0" }}
          center={center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={center.lat}
            lng={center.lng}
            text="My Marker"
          />
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

