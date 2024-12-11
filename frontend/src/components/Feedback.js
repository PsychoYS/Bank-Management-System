import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  Paper,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Feedback = () => {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    rating: 5
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.data.success) {
        setOpen(true);
        setFormData({
          subject: '',
          message: '',
          rating: 5
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Provide Feedback
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your feedback helps us improve our services. Please share your thoughts with us.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rate our service</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              size="large"
            />
          </Box>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Submit Feedback
          </Button>
        </Box>
        
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Thank you for your feedback!
          </Alert>
        </Snackbar>
        
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Feedback; 