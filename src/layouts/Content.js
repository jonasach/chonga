import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LayoutContext } from './Root';
import { styled } from '@mui/system';

const StyledContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Content = ({ className, component: Component, style, ...props }) => {
  const ctx = useContext(LayoutContext);
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    open,
    navAnchor,
    squeezed,
  } = ctx;
  const getMargin = () => {
    if (navAnchor !== 'left') return 0;
    if (navVariant === 'persistent' && open) {
      return navWidth;
    }
    if (navVariant === 'permanent') {
      if (collapsible) {
        if (collapsed) return collapsedWidth;
        return navWidth;
      }
      return navWidth;
    }
    return 0;
  };
  const getWidth = () => {
    if (navVariant === 'persistent' && open) {
      if (squeezed) {
        return 'auto';
      }
      return '100%';
    }
    return 'auto';
  };
  return (
    <StyledContent
      as={Component} // Use the 'as' prop to apply the specified component
      {...props}
      className={`${className}`}
      style={{
        ...style,
        marginLeft: getMargin(),
        width: getWidth(),
      }}
    />
  );
};

Content.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  style: PropTypes.shape({}),
};
Content.defaultProps = {
  className: '',
  component: 'main',
  style: {},
};

export default Content;
