import React from 'react';
import {View, Image, Text, useColorScheme, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import dynamicStyles from './styles';

const WalkthroughScreen = ({route}) => {
  const {appConfig, appStyles} = route.params;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.image,
        icon: screenSpec.icon,
        backgroundColor:
          appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      };
    },
  );

  const _renderItem = ({item, dimensions}) => {
    return (
      <View style={[dimensions, styles.container]}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.content}>
          <Image
            style={styles.image}
            source={item.icon}
            size={100}
            color="white"
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      renderItem={_renderItem}
      //Handler for the done On last slide
      showSkipButton={true}
      showDoneButton={true}
      showNextButton={true}
      showPrevButton={false}
    />
  );
};

WalkthroughScreen.propTypes = {
  appConfig: PropTypes.object,
  appStyles: PropTypes.object,
};

export default WalkthroughScreen;
