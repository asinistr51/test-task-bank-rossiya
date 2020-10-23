import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export const Navbar: React.FC = (): React.ReactElement => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <img width="220" src="logo.png" alt="123" />
      </Toolbar>
    </AppBar>
  );
};
