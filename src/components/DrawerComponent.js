import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerComponent = ({ drawerOpen, toggleDrawer }) => {
  const drawerList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/logs">
          <ListItemText primary="Logs" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      {drawerList}
    </Drawer>
  );
};

export default DrawerComponent;