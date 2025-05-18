import { Container, Box, Typography, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h2" textAlign="center" gutterBottom>
        Get In Touch
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 2 },
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Name"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        />
        <TextField
          fullWidth
          type="email"
          placeholder="Email"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Message"
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#ff6f61',
            borderRadius: '30px',
            '&:hover': {
              bgcolor: '#d9534f',
              transform: 'scale(1.1)',
            },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
