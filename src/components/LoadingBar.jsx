import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import "../styles/LoadingBar.scss";

export default function LinearIndeterminate() {
  return (
    <div className="loading-bar">
      <Box sx={{ width: '50%' }}>
        <LinearProgress />
      </Box>
    </div>
  );
}