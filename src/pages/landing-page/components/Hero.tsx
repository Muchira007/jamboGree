import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        height: '86vh', // Ensures the hero section takes the full viewport height
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'url("../../../../public/img/earthy2.jpg")' // Replace with your image
            : 'url("../../../../public/img/earthy.jpg")', // Replace with your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative', // Ensures that the content is positioned relative to the background
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Center the content vertically and horizontally
          position: 'absolute', // Absolute positioning of content over the background
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2, // Makes sure the content appears above the background
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color: '#000', // Ensure the text is visible on top of the background
            }}
          >
            Jambo Green&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Jikos
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            fontSize={{ xs: '0.5rem', md: '1rem' }}
            color="#000" // Text color for better visibility on the background
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >

Discover the transformative power of modernized and improved jikos,
reducing carbon emissions while empowering communities.
By adopting cleaner cookstoves, we help protect the environment, improve health, 
and create sustainable opportunities. Join us in building a greener, more connected future, one cookstove at a time, one household at a time. Together, 
we empower families, reduce carbon footprints, and create sustainable change for generations to come.
          </Typography>
         
          
        </Stack>
      </Container>
    </Box>
  );
}
