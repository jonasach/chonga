import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { LayoutContext } from './Root';

const StyledFooter = styled('footer')(({ theme, marginLeft }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.grey[200],
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: marginLeft,
}));

const Footer = ({
  className,
  component: Component = 'div',
  style,
  ...props
}) => {
  const ctx = useContext(LayoutContext);
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    footerShrink,
    open,
    navAnchor,
  } = ctx;
  const getMargin = () => {
    if (navAnchor !== 'left' || !footerShrink) return 0;
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
  return (
    <StyledFooter
      component={Component}
      {...props}
      className={`${className}`}
      style={{ ...style }}
      marginLeft={getMargin()}
    />
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  style: PropTypes.shape({}),
};
Footer.defaultProps = {
  className: '',
  component: 'footer',
  style: {},
};

export default Footer;
