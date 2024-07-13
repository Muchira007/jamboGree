import React from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import './Status404.css'; // Import a CSS file for styles

function Status404() {
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flex: 1,
          overflow: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              The page you were looking for doesn't exist.
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              It's on us, we moved the content to a different page. The search below should help!
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  type="text"
                  placeholder="Search terms here..."
                  sx={{
                    backgroundColor: '#ffffff',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained" size="small" sx={{ marginRight: '-8px' }}>
                        Search
                      </Button>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider sx={{ my: 4 }}>OR</Divider>
              <Button href="/overview" variant="outlined">
                Go to homepage
              </Button>
            </Card>
          </Container>
        </Container>
      </Box>
    </>
  );
}

export default Status404;
