import { createTheme } from '@mui/material/styles';

// Function to create theme based on mode
export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#ff6f61', // Coral accent for both modes
      },
      secondary: {
        main: '#f7a399', // Lighter coral/peach
      },
      background: {
        // More grey backgrounds for light mode
        default: mode === 'dark' ? '#121212' : '#e5e5e7', 
        paper: mode === 'dark' ? '#1e1e1e' : '#ececee',
      },
      text: {
        // Different text colors based on mode
        primary: mode === 'dark' ? '#e0e0e0' : '#444444',
        secondary: mode === 'dark' ? '#b0b0b0' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(18, 18, 18, 0.8)' 
              : 'rgba(220, 220, 225, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: mode === 'dark'
              ? '0 2px 10px rgba(0,0,0,0.5)'
              : '0 2px 10px rgba(0,0,0,0.1)',
            color: mode === 'dark' ? '#ffffff' : '#333333',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#e8e8ea',
            border: mode === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '8px',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#d1423d',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.08)',
            color: mode === 'dark' ? '#e0e0e0' : '#555555',
          }
        }
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(30, 30, 30, 0.9)' 
              : 'rgba(215, 215, 220, 0.9)',
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#e0e0e0' : '#555555',
          },
          head: {
            fontWeight: 600,
            color: mode === 'dark' ? '#ffffff' : '#444444',
          }
        }
      }
    },
  });
};

// Default export is the dark theme
export default createAppTheme('dark');
