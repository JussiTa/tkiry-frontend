import { Box, Typography } from "@mui/material";


export const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" color="inherit" component="div">
        Arvontasivu
      </Typography>
      <div>
        <span>&copy; 2025 TkiRy</span>
      </div>
    </Box>
  );
};
