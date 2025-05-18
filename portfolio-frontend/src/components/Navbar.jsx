import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import { useThemeMode } from '../context/ThemeContext';

const Navbar = ({ scrollToSection, isMobile, toggleSidebar }) => {
  const { mode, toggleColorMode } = useThemeMode();
  
  const handleNavigation = (sectionId) => {
    console.log('Navbar: Scrolling to section', sectionId);
    scrollToSection(sectionId);
  };

  return (
    <AppBar 
      id="main-navbar"
      position="fixed" 
      sx={{ 
        bgcolor: mode === 'dark' 
          ? 'rgba(18, 18, 18, 0.7)' 
          : 'rgba(245, 245, 247, 0.7)', 
        backdropFilter: 'blur(15px)', 
        WebkitBackdropFilter: 'blur(15px)',
        zIndex: 1100,
        top: 0,
        left: isMobile ? 0 : '250px',
        right: 0,
        width: isMobile ? '100%' : 'calc(100% - 250px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar sx={{ width: '100%', px: 3 }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            color: '#ff6f61',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            textAlign: isMobile ? 'left' : 'center'
          }}
          onClick={() => handleNavigation('home')}
        >
          My Portfolio
        </Typography>
        
        {/* Theme toggle button */}
        <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton 
            onClick={toggleColorMode} 
            color="inherit"
            aria-label="toggle theme"
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
