import {StyleSheet} from 'react-native';
import {colors, textStyles} from '@constants';
/* Fix safeArea for iphoneX and other devices , use a screen view that wrap all the screens instide*/
export default StyleSheet.create({
  safeArea: {
    backgroundColor: colors.blue,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightsList: {
    backgroundColor: colors.whiteBackground,
    paddingHorizontal: 20,
  },
  openedToday: {
    ...textStyles.openedToday,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  switchContainer: {
    position: 'absolute',
    top: 50 + 28,
    right: 20,
  },
});
