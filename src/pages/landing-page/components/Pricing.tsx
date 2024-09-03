import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { FaLeaf, FaFire, FaWater, FaLightbulb } from 'react-icons/fa';

const products = [
  {
    icon: <FaLeaf size={40} />,
    description: 'Eco-friendly cookstove designed to reduce carbon emissions.',
  },
  {
    icon: <FaFire size={40} />,
    description: 'High-efficiency stove for optimal cooking performance.',
  },
  {
    icon: <FaWater size={40} />,
    description: 'Water-saving technology integrated for a sustainable solution.',
  },
  {
    icon: <FaLightbulb size={40} />,
    description: 'Smart stove with energy-saving features and modern design.',
  },
];

export default function Products() {
  return (
    <Container
      id="products"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Our Products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover our range of innovative products designed to make a positive impact on your life and the environment.
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                backgroundColor: 'white',
                border: '1px solid',
                height: '60vh',
                width: '80%',
                borderColor: 'grey.300',
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2, color: 'green' }}>
                  {product.icon}
                </Box>
                <Typography variant="body1" color="text.primary" align="center">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
