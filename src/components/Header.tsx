import { Box, IconButton, Toolbar, Typography, } from '@mui/material';
import AppBar from '@mui/material/AppBar';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
     
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Arvontasivu
        </Typography>
      </Toolbar>
    </AppBar>
   </Box>
  );
};
