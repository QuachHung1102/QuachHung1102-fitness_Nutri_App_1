import {StyleSheet, Dimensions} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: 'white',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: width,
      borderBottomRightRadius: width / 2, // Làm cong góc dưới bên phải
      overflow: 'hidden', // Ẩn phần của hình ảnh nằm ngoài ranh giới
      marginBottom: 60,
    },
    container: {},
    content: {
      paddingBottom: height * 0.05,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: height * 0.025,
      backgroundColor: '#5244F3',
      paddingHorizontal: width * 0.1,
      borderRadius: width * 0.02,
    },
  });
};

const {width, height} = Dimensions.get('window');

export default dynamicStyles;
