import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import QuestionScreen from './src/screens/WalkthroughScreen/QuestionScreen';

// Import necessary modules

// Create a functional component for the view

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backGroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backGroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={[
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
            styles.flex1,
          ]}>
          <QuestionScreen />
        </View>
      </ScrollView>
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
