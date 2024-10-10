import {
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import styles from './styles';
import { strings } from '../../theme/string';
  
  const ListItem = ({onPress, item}:any) => {
    return (
      <TouchableOpacity style={styles.FlatListContainer} onPress={onPress}>
        <View style={styles.containerMid}>
          <View style={[styles.profileImg, {backgroundColor: item.color}]}>
            <Text style={styles.profilePic}>{item.avatar}</Text>
          </View>
          <View style={styles.textGap}>
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textMsg}>{strings.youHello}, {item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  
  export default ListItem;
  