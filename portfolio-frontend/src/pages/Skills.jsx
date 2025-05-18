import { Container, Typography, Box, Paper, useTheme, alpha, CircularProgress } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { getAllSkills } from '../services/skillsService';

const Skills = () => {
  const theme = useTheme();
  const [animated, setAnimated] = useState(false);
  const [skills, setSkills] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getAllSkills();
        setSkills(response.data);
        setProgress(response.data.map(() => 0));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching skills data:', err);
        setError('Failed to load skills data');
        setLoading(false);
      }
    };
    
    fetchSkills();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // If section is visible and hasn't been animated yet
        if (entry.isIntersecting && !animatedRef.current && !loading && skills.length > 0) {
          console.log('Skills section is now visible!');
          setAnimated(true);
          animatedRef.current = true; // Mark as animated to prevent re-triggering
          
          // Start the animation
          startProgressAnimation();
        }
      },
      {
        root: null, // Use viewport as root
        threshold: 0.25, // Trigger when at least 25% of the section is visible
        rootMargin: '0px', // No margin
      }
    );

    if (sectionRef.current && !loading) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [loading, skills]);

  // Animation function for progress bars
  const startProgressAnimation = () => {
    const duration = 1500; // Animation duration in ms
    const frameRate = 20; // Update every 20ms
    const steps = duration / frameRate;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(timer);
        return;
      }
      
      setProgress(skills.map((skill) => {
        // Calculate current value based on animation progression
        return Math.min((skill.value * currentStep) / steps, skill.value);
      }));
      
      currentStep++;
    }, frameRate);
  };

  // Modern color palette based on category
  const getSkillColor = (category) => {
    switch (category) {
      case "development":
        return {
          main: '#6366f1', // Indigo
          light: '#818cf8',
          dark: '#4f46e5',
          gradient: 'linear-gradient(90deg, #6366f1, #818cf8)'
        };
      case "design":
        return {
          main: '#ec4899', // Pink
          light: '#f472b6',
          dark: '#db2777',
          gradient: 'linear-gradient(90deg, #ec4899, #f472b6)'
        };
      case "database":
        return {
          main: '#06b6d4', // Cyan
          light: '#22d3ee',
          dark: '#0891b2',
          gradient: 'linear-gradient(90deg, #06b6d4, #22d3ee)'
        };
      case "soft":
        return {
          main: '#f59e0b', // Amber
          light: '#fbbf24',
          dark: '#d97706',
          gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
        };
      default:
        return {
          main: theme.palette.primary.main,
          light: theme.palette.primary.light,
          dark: theme.palette.primary.dark,
          gradient: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
        };
    }
  };
  
  const getLevelPercentage = (level) => {
    switch(level) {
      case 'Beginner': return 25;
      case 'Intermediate': return 50;
      case 'Advanced': return 75;
      case 'Expert': return 95;
      default: return 0;
    }
  };

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
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        py: { xs: 6, md: 10 },
        px: 2,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          textAlign="center"
          sx={{ 
            mb: { xs: 5, md: 8 },
            fontWeight: 'bold',
            background: 'linear-gradient(120deg, #ff6f61, #f7a399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            animation: animated ? 'fadeIn 1s ease-in-out' : 'none'
          }}
        >
          Skills
        </Typography>
        
        <Paper 
          elevation={0}
          sx={{ 
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: { xs: 3, md: 5 },
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {skills.length === 0 ? (
            <Typography>No skills found</Typography>
          ) : (
            skills.map((skill, index) => {
              const colors = getSkillColor(skill.category);
              
              return (
                <Box 
                  key={skill._id || index} 
                  sx={{ 
                    mb: index < skills.length - 1 ? 5 : 0,
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease-out ${0.2 + index * 0.1}s`,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: colors.main,
                        fontWeight: 600,
                        letterSpacing: '0.5px'
                      }}
                    >
                      {skill.name}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: colors.light,
                        fontWeight: 600,
                        backgroundColor: alpha(colors.main, 0.1),
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                        fontSize: '0.875rem',
                        minWidth: '44px',
                        textAlign: 'center'
                      }}
                    >
                      {skill.level}
                    </Typography>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      position: 'relative',
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: alpha(colors.main, 0.12),
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${getLevelPercentage(skill.level)}%`,
                        background: colors.gradient,
                        borderRadius: 5,
                        transition: 'none',
                        boxShadow: `0 0 8px ${alpha(colors.main, 0.5)}`
                      }}
                    />
                  </Box>
                </Box>
              );
            })
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Skills;
