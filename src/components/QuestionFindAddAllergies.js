import {useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';

export default function QuestionFindAddAllergies({handleInputChange}) {
  return (
    <View style={styles.container_inPut}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleInputChange}
        placeholder="Tìm kiếm"
        placeholderTextColor="white"
      />
    </View>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container_inPut: {
    borderBottomWidth: 2,
    borderColor: 'white',
    marginTop: height * 0.075,
  },
  textInput: {
    color: 'white',
    width: width * 0.8,
    padding: 10,
    fontSize: height * 0.02,
  },
});
