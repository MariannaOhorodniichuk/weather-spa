import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  height?: number | string;
  minHeight?: number | string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  height = '100%', 
  minHeight = '100vh' 
}) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height={height}
      minHeight={minHeight}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner; 