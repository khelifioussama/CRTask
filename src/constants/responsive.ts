import {Dimensions, StatusBar, Platform} from 'react-native';
import {ifIphoneX} from './iPhoneX';
import breakpoints from './breakpoints';

const {height, width} = Dimensions.get('window');

const isSmallScreen =
  width <= breakpoints.smallPhoneWidth ||
  height <= breakpoints.smallPhoneHeight;

const isNormalScreen =
  width > breakpoints.smallPhoneWidth && width < breakpoints.mediumPhoneWidth;

const isBigScreen = width >= breakpoints.mediumPhoneWidth;

const isBiggestPhoneScreen = width >= breakpoints.bigPhoneWidth;

const normalizedFontSize = (basicFontSize: number) => {
  if (isSmallScreen) {
    return basicFontSize - 1;
  }
  if (isNormalScreen) {
    return basicFontSize;
  }
  if (isBigScreen) {
    return basicFontSize + 1;
  }

  return basicFontSize;
};

const responsiveHeight = (h: number) => height * (h / 100);

const responsiveWidth = (w: number) => width * (w / 100);

const getRealHeight = (w: number, h: number, elementWidth: number) =>
  (h * elementWidth) / w;

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return ifIphoneX(44, 20);
  }

  return StatusBar.currentHeight;
};

// status barheight is unused
const statusBarHeight = getStatusBarHeight();

// https://github.com/react-navigation/stack/blob/3ed1b283f14388d10213a640b153eb74c1d8536a/src/views/Header/HeaderSegment.tsx#L70
// used the same values as used in react-navigation
const headerBarHeight = Platform.OS === 'ios' ? 44 : 56;

export default {
  isSmallScreen,
  isNormalScreen,
  isBigScreen,
  isBiggestPhoneScreen,
  normalizedFontSize,
  responsiveHeight,
  responsiveWidth,
  getRealHeight,
  statusBarHeight,
  headerBarHeight,
};
