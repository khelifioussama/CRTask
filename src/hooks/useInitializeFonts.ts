import {useFonts} from 'expo-font';

export const useInitializeFonts = () => {
  const [loaded] = useFonts({
    'Muli-Regular': require('@assets/fonts/Muli-Regular.ttf'),
    'Muli-SemiBold': require('@assets/fonts/Muli-SemiBold.ttf'),
    'Muli-Bold': require('@assets/fonts/Muli-Bold.ttf'),
    'Muli-ExtraBold': require('@assets/fonts/Muli-ExtraBold.ttf'),
    IcoMoon: require('@assets/fonts/icomoon/icomoon.ttf'),
  });

  return {isLoaded: loaded};
};
