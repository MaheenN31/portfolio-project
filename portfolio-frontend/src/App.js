import { useState, useEffect } from 'react';
import { Box, useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Footer from './components/Footer';

// Fixed sidebar width to use in calculations
const SIDEBAR_WIDTH = 250;

function App() {
  // State for mobile sidebar toggling
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Detect if on mobile
  const isMobile = useMediaQuery('(max-width:900px)');
  
  // Function to toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  // Close sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileSidebarOpen(false);
    }
  }, [isMobile]);

  // Function for smooth scrolling
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const navbarHeight = 64; 
      const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      console.log(`Scrolling to ${sectionId} at position ${sectionTop}`);
    } else {
      console.error(`Section with ID ${sectionId} not found.`);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar - visible always on desktop, togglable on mobile */}
      <Sidebar 
        scrollToSection={scrollToSection}
        isMobile={isMobile}
        isOpen={isMobileSidebarOpen}
        toggleSidebar={toggleMobileSidebar}
      />
      
      {/* Mobile sidebar backdrop - only visible when sidebar is open on mobile */}
      {isMobile && isMobileSidebarOpen && (
        <Box
          onClick={toggleMobileSidebar}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1199, // Below sidebar but above content
          }}
        />
      )}
      
      {/* Main content area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,  // Only push content on desktop
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Navbar with mobile menu button */}
        <Navbar
          scrollToSection={scrollToSection}
          isMobile={isMobile}
          toggleSidebar={toggleMobileSidebar}
        />
        
        {/* Main content sections */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div id="home">
            <Home scrollToSection={scrollToSection} />
          </div>
          <div id="education">
            <Education />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </Box>

        {/* Footer at the bottom */}
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
