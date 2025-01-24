import {
  Box,
  Button,
  
  IconButton,
  
  Menu,
  
  MenuItem,
  
  Toolbar,
  
 
} from "@mui/material";

import {AccountCircle} from '@mui/icons-material'
import AppBar from "@mui/material/AppBar";
import React from "react";
import { useAuthContext } from "../features/auth/hooks/use-auth-context";
export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { isAuthenticated, logout } = useAuthContext();
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {

    logout();
  

    setAnchorEl(null);
  };

  const pages = [{
    "name":
    "LISTA", "url": "/lotlist"},{"name":"LUO LISTA", "url": "/createList"}, {name: "TULOSTA LISTA", url: "/listDocument"}];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
         

          {isAuthenticated && (
            <>
             <Box sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
               
                sx={{ my: 2, color: "white", display: "block" }}
              href={page.url}
              >
                {page.name}
             
              </Button>
            ))}
          </Box>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
             
                <MenuItem id="logout" onClick={handleClose} href="/logout" >Kirjaudu ulos</MenuItem>
              </Menu>
            </div>
            </>
          )}
     
        </Toolbar>
      </AppBar>
    </Box>
  );
};
