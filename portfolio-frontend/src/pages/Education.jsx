import { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, CircularProgress } from '@mui/material';
import { getAllEducation } from '../services/educationService';

const Education = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        console.log("Fetching education data...");
        const response = await getAllEducation();
        console.log("Education data response:", response);
        console.log("Education data:", response.data);
        setEducation(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching education data:', err);
        setError('Failed to load education data: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchEducation();
  }, []);
  
  if (loading) {
    return (
      <Container sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  
  return (
    <Container sx={{ py: 5 }}>
      <Typography 
        variant="h2" 
        textAlign="center" 
        sx={{ color: '#ff6f61', mb: 4 }}
      >
        Education
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          maxWidth: '80%',
          margin: 'auto',
          boxShadow: isDarkMode 
            ? '0 4px 8px rgba(0, 0, 0, 0.5)' 
            : '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                color: isDarkMode ? '#e0e0e0' : '#666666',
                fontWeight: 'bold'
              }}>Degree</TableCell>
              <TableCell sx={{ 
                color: isDarkMode ? '#e0e0e0' : '#666666',
                fontWeight: 'bold'
              }}>Institution</TableCell>
              <TableCell sx={{ 
                color: isDarkMode ? '#e0e0e0' : '#666666',
                fontWeight: 'bold'
              }}>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((row) => (
              <TableRow key={row._id}>
                <TableCell sx={{ color: isDarkMode ? '#e0e0e0' : '#666666' }}>
                  {row.degree}
                </TableCell>
                <TableCell sx={{ color: isDarkMode ? '#e0e0e0' : '#666666' }}>
                  {row.institution}
                </TableCell>
                <TableCell sx={{ color: isDarkMode ? '#e0e0e0' : '#666666' }}>
                  {new Date(row.startDate).getFullYear()} - {row.current ? 'Present' : new Date(row.endDate).getFullYear()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Education;
