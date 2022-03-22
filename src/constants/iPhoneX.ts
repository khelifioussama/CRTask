// Functions used to detect iphoneX
// https://github.com/ptelad/react-native-iphone-x-helper
// use react-native-iphone-x-helper
import {Dimensions, Platform, StatusBar} from 'react-native';

const dimension = Dimensions.get('window');

const isIphoneX = () =>
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (dimension.height === 812 ||
    dimension.width === 812 ||
    dimension.height === 896 ||
    dimension.width === 896);

const ifIphoneX = (iphoneXStyle: number, regularStyle: number) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }

  return regularStyle;
};

const getStatusBarHeight = (safe = false) =>
  Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });

const getBottomSpace = () => (isIphoneX() ? 34 : 0);

export {isIphoneX, ifIphoneX, getStatusBarHeight, getBottomSpace};
