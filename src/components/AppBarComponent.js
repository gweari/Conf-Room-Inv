import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';

const AppBarComponent = ({ toggleDrawer, setShowAddForm, setShowMassEditForm, exportRef, importRef }) => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Conference Room Inventory
        </Typography>
        {location.pathname === '/' && (
          <>
            <Button color="inherit" onClick={() => setShowAddForm(true)}>Add Room</Button>
            <Button color="inherit" onClick={() => setShowMassEditForm(true)}>Mass Edit</Button>
            <Button color="inherit" onClick={() => exportRef.current.click()}>Export CSV</Button>
            <Button color="inherit" onClick={() => importRef.current.click()}>Import CSV</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;