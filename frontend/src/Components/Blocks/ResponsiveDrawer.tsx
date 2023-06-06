import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: 240,
    flexShrink: 0,
  },
}));

const ResponsiveDrawer = () => {
  const theme = useTheme();
  const isMdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(isMdAndUp);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <div>
      {/* Logo */}
      <img src="/path/to/logo.png" alt="Logo" style={{ width: 150 }} />

      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/myshelf">My Shelf</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <StyledDrawer
      variant={isMdAndUp ? 'permanent' : 'temporary'}
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {drawerContent}
    </StyledDrawer>
  );
};

export default ResponsiveDrawer;
