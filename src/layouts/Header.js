import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LayoutContext } from './Root';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { styled, useTheme } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '& .menuButton': {
    marginLeft: -8,
    marginRight: 8,
  },
}));

const createGet = (
  { clipped, navVariant, collapsible, collapsed, open, squeezed, navAnchor },
  normal,
  shrink,
  pushed,
  unsqueeze,
) => () => {
  if (clipped || navAnchor !== 'left') return normal;
  if (navVariant === 'persistent' && open) {
    // open is effect only when
    // navVariant === 'persistent' ||
    // navVariant === 'temporary'
    if (squeezed) {
      return pushed;
    }
    return unsqueeze;
  }
  if (navVariant === 'permanent') {
    if (collapsible) {
      if (collapsed) return shrink;
      return pushed;
    }
    return pushed;
  }
  return normal;
};

const Header = ({
  className,
  component: Component,
  menuIcon,
  style,
  children,
  toolbarProps,
  ...props
}) => {
  const theme = useTheme(); // Using theme directly
  const ctx = useContext(LayoutContext);
  const {
    clipped,
    collapsedWidth,
    navWidth,
    navVariant,
    headerPosition,
    open,
    setOpen,
  } = ctx;
  const getWidth = createGet(
    ctx,
    '100%',
    `calc(100% - ${collapsedWidth}px)`,
    `calc(100% - ${navWidth}px)`,
    '100%',
  );
  const getMargin = createGet(ctx, 0, collapsedWidth, navWidth, navWidth);
  const shouldRenderMenu = navVariant !== 'permanent' && !!menuIcon;
  return (
    <StyledAppBar
      color={'default'}
      elevation={0}
      {...props}
      className={className}
      position={headerPosition}
      style={{
        ...style,
        zIndex: clipped ? theme.zIndex.drawer + 1 : theme.zIndex.appBar,
        width: getWidth(),
        marginLeft: getMargin(),
      }}
    >
      <Toolbar {...toolbarProps}>
        {shouldRenderMenu && (
          <IconButton onClick={setOpen} className={'menuButton'}>
            {open ? menuIcon.active : menuIcon.inactive || menuIcon.active}
          </IconButton>
        )}
        {typeof children === 'function' ? children(ctx) : children}
      </Toolbar>
    </StyledAppBar>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  style: PropTypes.shape({}),
  position: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  toolbarProps: PropTypes.shape({}),
  menuIcon: PropTypes.shape({
    inactive: PropTypes.node.isRequired,
    active: PropTypes.node,
  }),
};

Header.defaultProps = {
  className: '',
  component: 'div',
  style: {},
  position: 'relative',
  toolbarProps: {},
  menuIcon: null,
};

export default Header;
