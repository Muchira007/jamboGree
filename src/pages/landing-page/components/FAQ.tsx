import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const green = '#4CAF50'; // Green color

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
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
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
          mb: 3,
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: green }} />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2" sx={{ color: green }}>
              What are carbon credits and how do they work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Carbon credits are a tradeable certificate representing the reduction of one metric ton of carbon dioxide emissions. They are used to offset carbon emissions produced by individuals or companies. By purchasing carbon credits, you support projects that reduce greenhouse gases, such as improved cookstove initiatives.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: green }} />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2" sx={{ color: green }}>
              How do jikos contribute to carbon credit programs?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Jikos, or improved cookstoves, reduce fuel consumption and emissions compared to traditional stoves. By adopting jikos, households can lower their carbon footprint and generate carbon credits. These credits can be verified and sold to offset emissions, providing financial support for the continued production and distribution of jikos.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: green }} />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2" sx={{ color: green }}>
              How can I verify the impact of carbon credits from jikos?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              The impact of carbon credits from jikos is verified through monitoring and reporting by accredited third-party organizations. These organizations track the reduction in emissions achieved by the use of improved cookstoves and ensure that the carbon credits are accurately accounted for. Reports and certifications from these organizations can provide transparency and assurance of the credits' impact.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
          
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: green }} />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2" sx={{ color: green }}>
              What are the benefits of using jikos beyond carbon credits?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Beyond carbon credits, jikos offer several benefits including reduced fuel consumption, lower indoor air pollution, and improved cooking efficiency. These benefits contribute to healthier living conditions, reduced deforestation, and cost savings for households by reducing the amount of fuel needed for cooking.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
