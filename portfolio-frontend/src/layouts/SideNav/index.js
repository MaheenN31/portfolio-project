import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useNavigate } from 'react-router-dom';
import styles from './SideNav.module.css';

const menuItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Education', path: '/education', icon: <SchoolIcon /> },
  { text: 'Projects', path: '/projects', icon: <WorkIcon /> },
  { text: 'Contact', path: '/contact', icon: <ContactMailIcon /> }
];

const SideNav = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const drawerContent = (
    <List className={styles.navList}>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text}
          onClick={() => {
            navigate(item.path);
            if (isMobile) onClose();
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <nav className={styles.sideNav}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={isOpen}
          onClose={onClose}
          classes={{
            paper: styles.drawerPaper
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          classes={{
            paper: styles.drawerPaper
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </nav>
  );
};

export default SideNav;
