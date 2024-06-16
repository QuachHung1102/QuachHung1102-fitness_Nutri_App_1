import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useSpacing } from '../../../hooks/useSpacing'
// import { useDopebase, useTheme } from '../../../theming'
import dynamicStyles from './styles';

const Button = props => {
  const {
    containerStyle,
    textStyle,
    text,
    radius,
    onPress,
    styles,
    secondary,
    shadow,
    loading,
  } = props;
  const spacingStyles = useSpacing(props);
};
