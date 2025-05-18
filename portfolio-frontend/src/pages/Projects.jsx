import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Box, Chip, Stack, CircularProgress } from '@mui/material';
import { getAllProjects } from '../services/projectsService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects data:', err);
        setError('Failed to load projects data');
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 6, md: 10 }, // Responsive padding top/bottom
        px: 2, // Horizontal padding
        backgroundColor: 'background.default', // Use theme background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          textAlign="center" 
          gutterBottom // Adds bottom margin
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main', // Use theme primary color
            mb: { xs: 4, md: 6 } // Responsive margin bottom
          }}
        >
          My Works
        </Typography>
        
        {/* Simple flex container */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          justifyContent: 'space-between'
        }}>
          {projects.map((project) => (
            // Project card with explicit width
            <Box 
              key={project._id}
              sx={{ 
                width: { xs: '100%', md: 'calc(50% - 16px)' }, 
                mb: 4 
              }}
            >
              <Card 
                variant="outlined" // Use outlined variant for minimalism
                sx={{ 
                  height: '100%', // Make cards in a row equal height
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: 'rgba(255, 255, 255, 0.12)', // Subtle border color
                  borderRadius: '8px', // Consistent with theme
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Subtle shadow on hover
                    borderColor: 'primary.main' // Highlight border on hover
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="220" // Adjust height as needed
                  image={project.image || "/images/project-placeholder.jpg"}
                  alt={project.title}
                  sx={{ 
                    objectFit: 'cover', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)' // Subtle separator
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}> {/* Added padding */} 
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: '600', 
                      color: 'text.primary' // Use theme text color
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" // Use theme secondary text color
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    flexWrap="wrap" 
                    gap={1} // Use gap for better spacing control
                  >
                    {project.technologies && project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        variant="outlined" // Outlined chips for minimal look
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          fontSize: '0.75rem' // Slightly smaller font
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
