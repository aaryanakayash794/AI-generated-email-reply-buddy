import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  Container,
  TextField,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Button,
  Paper
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:9090/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{
        mt: 4, 
        p: 3,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA)', // teal → blue → purple
        boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating emojis (animated) */}
      <Box sx={{ 
        position: 'absolute', 
        top: '10%', left: '10%', 
        fontSize: '2rem', 
        animation: 'float 4s infinite ease-in-out' 
      }}>💌</Box>
      <Box sx={{ 
        position: 'absolute', 
        top: '20%', right: '15%', 
        fontSize: '2.2rem', 
        animation: 'float 6s infinite ease-in-out' 
      }}>✨</Box>
      <Box sx={{ 
        position: 'absolute', 
        bottom: '15%', left: '20%', 
        fontSize: '2.5rem', 
        animation: 'float 5s infinite ease-in-out' 
      }}>🤖</Box>
      <Box sx={{ 
        position: 'absolute', 
        bottom: '10%', right: '10%', 
        fontSize: '2rem', 
        animation: 'float 7s infinite ease-in-out' 
      }}>📬</Box>

      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center',
          color: '#ffffff',
          textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
        }}
      >
        ✨ AI Email Reply Generator ✨
      </Typography>

      <Paper elevation={6} sx={{ p: 3, borderRadius: 4, backgroundColor: '#ffffffd9' }}>
        {/* Original Email Content */}
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="📩 Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{
            mb: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
          }}
        />

        {/* Tone Dropdown */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>🎭 Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={{ backgroundColor: '#fff', borderRadius: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        {/* Generate Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 3,
            background: 'linear-gradient(45deg, #FF512F, #DD2476)', // orange → pink
            '&:hover': { background: 'linear-gradient(45deg, #F7971E, #FFD200)' }
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "🚀 Generate Reply"}
        </Button>
      </Paper>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2, mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
          ❌ {error}
        </Typography>
      )}

      {/* Generated Reply Box */}
      {generatedReply && (
        <Paper elevation={6} sx={{ mt: 4, p: 3, borderRadius: 4, backgroundColor: '#E0F7FA' }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            🎉 Your Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
            }}
          />
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              fontWeight: 'bold',
              borderRadius: 3,
              color: '#2c3e50',
              borderColor: '#2c3e50',
              '&:hover': { background: '#2c3e50', color: 'white' }
            }}
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            📋 Copy to Clipboard
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default App;
