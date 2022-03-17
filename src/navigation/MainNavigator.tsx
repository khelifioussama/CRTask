import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Connections, Booking} from 'src/screens';
import {t} from '@translations';

const Stack = createStackNavigator();

/*
Passing an inline function will cause the component state to be lost on re-render and cause perf issues since it's re-created every render
     Line 24 :        component={() => <Booking />} should be component={Booking}
        
*/
export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Connections'}
          component={Connections}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'BookingScreen'}
          component={Booking}
          options={{title: t.myBooking.title}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
