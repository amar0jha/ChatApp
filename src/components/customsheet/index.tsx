import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import styles from './styles';

const BottomSheetOption = ({ icon, text, onPress }:any) => {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BottomSheetOption;
