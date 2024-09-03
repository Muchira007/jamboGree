import React from 'react';
import { Box, Container, Grid, Typography, Stack, Card } from '@mui/material';
import { FaLeaf, FaHome, FaUsers, FaDollarSign, FaChartBar, FaHandsHelping } from 'react-icons/fa';

const items = [
  {
    icon: <FaLeaf size={40} />,
    title: '415,000+ Clean Stoves Sold',
    description:
      'Our modernized cookstoves have been distributed to over 415,000 households, significantly reducing carbon emissions and improving air quality.',
  },
  {
    icon: <FaHome size={40} />,
    title: '2,500+ Households Served',
    description:
      'We have directly served over 2,500 households, enhancing their quality of life with cleaner cooking solutions.',
  },
  {
    icon: <FaUsers size={40} />,
    title: '2 Million+ Lives Impacted',
    description:
      'Our initiatives have positively impacted over 2 million lives, providing cleaner cooking solutions and contributing to healthier households.',
  },
  {
    icon: <FaDollarSign size={40} />,
    title: '60% Female, 40% Male Sales Agents',
    description:
      'We proudly employ a balanced team with 60% female and 40% male sales agents, empowering women while fostering gender diversity.',
  },
  {
    icon: <FaHandsHelping size={40} />,
    title: '95% Local Staff',
    description:
      '95% of our staff members come from the communities we serve, ensuring that our efforts are deeply rooted and impactful locally.',
  },
  {
    icon: <FaChartBar size={40} />,
    title: 'Measurable Carbon Credits',
    description:
      'Our cookstoves generate measurable carbon credits, contributing to global carbon offset goals and promoting environmental sustainability.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <Container
        sx={{
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
          <Typography component="h2" variant="h4" color="black">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'black' }}>
            Discover the tangible impacts of our modernized cookstoves: from reducing carbon emissions and supporting local communities to empowering women and educating future generations. Join us in making a significant difference.
          </Typography>
        </Box>
        <Grid container spacing={2.5} alignItems="center">
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                spacing={2}
                component={Card}
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  backgroundColor: 'white',
                  color: 'black',
                  textAlign: 'center',
                }}
              >
                <Box sx={{ mb: 2, color: 'green' }}>{item.icon}</Box>
                <Typography fontWeight="medium" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
