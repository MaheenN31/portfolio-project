import { AppBar, Toolbar, Typography, Avatar, IconButton, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import styles from './Header.module.css';

const Header = ({ toggleSideNav }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSideNav}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          My Portfolio
        </Typography>
        <Avatar 
          alt="Profile Picture" 
          src="/path-to-your-image.jpg"
          sx={{ width: 40, height: 40 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
