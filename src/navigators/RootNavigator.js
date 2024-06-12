import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// Import screens
import {
  LoginScreen,
  QuestionScreen,
  WalkthroughScreen,
} from '../core/onboarding';
import WalkthroughAppConfig from '../data/WalkthroughAppConfig';
import DynamicAppStyles from '../screens/DynamicAppStyles';

const Root = createStackNavigator();

const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      initialRouteName="Walkthrough">
      <Root.Screen name="Login" component={LoginScreen} />
      <Root.Screen name="Question" component={QuestionScreen} />
      <Root.Screen
        name="Walkthrough"
        component={WalkthroughScreen}
        initialParams={{
          appConfig: WalkthroughAppConfig,
          appStyles: DynamicAppStyles,
        }}
      />
    </Root.Navigator>
  );
};

export default RootNavigator;
