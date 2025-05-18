import { Box, Typography } from '@mui/material';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
