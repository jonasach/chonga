import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import presets from './layoutPresets';

const keys = ['xs', 'sm', 'md', 'lg', 'xl'];

export const getScreenValue = (ctx, currentScreen, defaultValue) => {
  if (ctx === null || ctx === undefined) return defaultValue;
  if (typeof ctx !== 'object') {
    return ctx;
  }
  let index = keys.indexOf(currentScreen);
  while (index >= 0) {
    if (ctx[keys[index]] !== undefined) {
      return ctx[keys[index]];
    }
    index -= 1;
  }
  return defaultValue;
};

const initialConfig = presets.createDefaultLayout();
export const LayoutContext = React.createContext(initialConfig);

const RootDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Root = ({ className, component: Component, children, config }) => {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapse] = useState(false);

  // Define the width based on media queries
  const isXs = useMediaQuery('(max-width:599px)');
  const isSm = useMediaQuery('(min-width:600px) and (max-width:959px)');
  const isMd = useMediaQuery('(min-width:960px) and (max-width:1279px)');
  // Add more as needed

  let width;
  if (isXs) width = 'xs';
  else if (isSm) width = 'sm';
  else if (isMd) width = 'md';
  // Add more as needed

  const value = {
    open,
    collapsed,
    setCollapse,
    setOpen,
    clipped: getScreenValue(config.clipped, width, initialConfig.clipped),
    collapsible: getScreenValue(config.collapsible, width, initialConfig.collapsible),
    collapsedWidth: getScreenValue(config.collapsedWidth, width, initialConfig.collapsedWidth),
    navVariant: getScreenValue(config.navVariant, width, initialConfig.navVariant),
    navWidth: getScreenValue(config.navWidth, width, initialConfig.navWidth),
    navAnchor: getScreenValue(config.navAnchor, width, initialConfig.navAnchor),
    headerPosition: getScreenValue(config.headerPosition, width, initialConfig.headerPosition),
    squeezed: getScreenValue(config.squeezed, width, initialConfig.squeezed),
    footerShrink: getScreenValue(config.footerShrink, width, initialConfig.footerShrink),
    screen: width,
  };

  return (
    <LayoutContext.Provider value={value}>
      <RootDiv className={`${className}`}>
        {typeof children === 'function' ? children(value) : children}
      </RootDiv>
    </LayoutContext.Provider>
  );
};

const createScreenPropTypes = (valPropTypes) =>
  PropTypes.shape({
    xs: valPropTypes,
    sm: valPropTypes,
    md: valPropTypes,
    lg: valPropTypes,
    xl: valPropTypes,
  });

Root.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  config: PropTypes.shape({
    clipped: PropTypes.oneOfType([
      PropTypes.bool,
      createScreenPropTypes(PropTypes.bool),
    ]),
    collapsible: PropTypes.oneOfType([
      PropTypes.bool,
      createScreenPropTypes(PropTypes.bool),
    ]),
    collapsedWidth: PropTypes.oneOfType([
      PropTypes.number,
      createScreenPropTypes(PropTypes.number),
    ]),
    navVariant: PropTypes.oneOfType([
      PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
      createScreenPropTypes(
        PropTypes.oneOf(['permanent', 'persistent', 'temporary']),
      ),
    ]),
    navWidth: PropTypes.oneOfType([
      PropTypes.number,
      createScreenPropTypes(PropTypes.number),
    ]),
    navAnchor: PropTypes.oneOfType([
      PropTypes.oneOf(['left', 'bottom']),
      createScreenPropTypes(PropTypes.oneOf(['left', 'bottom'])),
    ]),
    headerPosition: PropTypes.oneOfType([
      PropTypes.oneOf(['static', 'relative', 'sticky', 'fixed', 'absolute']),
      createScreenPropTypes(
        PropTypes.oneOf(['static', 'relative', 'sticky', 'fixed', 'absolute']),
      ),
    ]),
    squeezed: PropTypes.oneOfType([
      PropTypes.bool,
      createScreenPropTypes(PropTypes.bool),
    ]),
    footerShrink: PropTypes.oneOfType([
      PropTypes.bool,
      createScreenPropTypes(PropTypes.bool),
    ]),
  }),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

Root.defaultProps = {
  className: '',
  component: 'div',
  config: initialConfig,
};

export default Root;
