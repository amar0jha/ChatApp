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
  
  const ListItem = ({onPress, item}:any) => {
    return (
      <TouchableOpacity style={styles.FlatListContainer} onPress={onPress}>
        <View style={styles.containerMid}>
          <View style={[styles.profileImg, {backgroundColor: item.color}]}>
            <Text style={styles.profilePic}>{item.avatar}</Text>
          </View>
          <View style={styles.textGap}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textMsg}>You: Hello, {item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  
  export default ListItem;
  