import React from 'react';
import {useInitializeFonts} from 'src/hooks/useInitializeFonts';
import {MainNavigator} from './src/navigation/MainNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {PaperTheme} from './src/styles/theme';
import {Provider} from 'react-redux';
import {store} from '@store/store';
export default function App() {
  const {isLoaded} = useInitializeFonts();

  if (!isLoaded) {
    /* use AppLoading  if font not ready */
    return null;
  }
 /* 
 add a View named screen that wrap the MainNavigator with statusBarHeight and footer ( responsive )
 */
  return (
    <Provider store={store}>
      <PaperProvider theme={PaperTheme}>
        <MainNavigator />
      </PaperProvider>
    </Provider>
  );
}
