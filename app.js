import React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  StatusBar,
  Dimensions,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

// Import necessary modules
import {Colors} from 'react-native/Libraries/NewAppScreen';

import RootNavigator from './src/navigators/RootNavigator';

// Create a functional component for the view

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backGroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.flex1]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backGroundColor}
      />
      <View
        style={[
          {
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          },
          styles.flex1,
        ]}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
};

// Define styles for the view

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  flex1: {
    height,
  },
});

export default App;
