import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';
import { LayoutContext } from './Root';
import { getScreenValue } from './Root';
import { initialConfig } from './Root';


const StyledNav = styled('div')(({ theme }) => ({
  root: {},
  container: {
    overflow: 'hidden',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  collapseButton: {
    backgroundColor: theme.palette.grey[50],
    textAlign: 'center',
    borderRadius: 0,
    borderTop: '1px solid',
    borderColor: 'rgba(0,0,0,0.12)',
    [theme.breakpoints.up('sm')]: {
      minHeight: 40,
    },
  },
  closeButton: {
    position: 'absolute',
    bottom: theme.spacing(2),
    zIndex: theme.zIndex.modal + 1,
    background: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    '@media (hover: none)': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:hover': {
      backgroundColor: '#e5e5e5',
    },
  },
}));

const Nav = ({
  className,
  component: Component,
  header,
  children,
  collapsedIcon,
  ...props
}) => {
  const ctx = useContext(LayoutContext);
  const {
    open,
    setOpen,
    navAnchor,
    navWidth,
    collapsedWidth,
    collapsible,
    collapsed,
    setCollapse,
  } = ctx;

// Access navVariant from the context
const navVariant = ctx.navVariant;
console.log('nav.narVariant', navVariant)


  const getWidth = () => {
    if (collapsible && collapsed) return collapsedWidth;
    return navWidth;
  };
  const shouldRenderButton = collapsible && collapsedIcon;
  const contentRef = useRef(null);
  return (
    <React.Fragment>
      <Drawer
        {...props}
        className={className}
        open={open}
        onClose={setOpen}
        variant={navVariant}

 
        anchor={navAnchor}
      >
        <StyledNav style={{ width: getWidth() }}>
          {typeof header === 'function' ? header(ctx) : header}
          <div ref={contentRef} className="content">
            {typeof children === 'function' ? children(ctx) : children}
          </div>
          {shouldRenderButton && (
            <Button
              className="collapseButton"
              fullWidth
              onClick={setCollapse}
            >
              {collapsed
                ? collapsedIcon.active
                : collapsedIcon.inactive || collapsedIcon.active}
            </Button>
          )}
        </StyledNav>
      </Drawer>
      <Grow in={open && navVariant === 'temporary' && collapsedIcon}>
        <IconButton
          className="closeButton"
          style={{ left: navWidth + 16 }}
          onClick={setOpen}
        >
          {collapsedIcon.inactive}
        </IconButton>
      </Grow>
    </React.Fragment>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  collapsedIcon: PropTypes.shape({
    inactive: PropTypes.node.isRequired,
    active: PropTypes.node,
  }),
};
Nav.defaultProps = {
  className: '',
  component: 'div',
  header: null,
  collapsedIcon: null,
};

export default Nav;
