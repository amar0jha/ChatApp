import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import styles from './styles';
  const width = Dimensions.get('screen').width;
  
  const Contact = ({onPress, item}:any) => {
    console.log('Contact',item);
    return (
      <TouchableOpacity style={styles.FlatListContainer} onPress={onPress}>
        <View style={styles.container2}>
          <View style={[styles.profileImg, {backgroundColor: item.color}]}>
            <Text style={styles.text1}>{item.avatar}</Text>
          </View>
          <View style={styles.textGap}>
            <Text style={styles.text2}>{item.name}</Text>
            <Text style={styles.text3}>You: Hello, {item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  
  export default Contact;
  