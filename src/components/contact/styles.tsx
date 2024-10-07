import { StyleSheet } from "react-native";
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
  } from 'react-native';
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    FlatListContainer: {
      flexDirection: 'row',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBlockColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    profileImg: {
      borderRadius: 100,
      padding: 15,
    },
    container2: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: width > 400 ? '80%' : '95%',
    },
    textGap:{
        marginHorizontal:20,
    },
  
    text1: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    //   fontFamily: family.Bold,
    },
    text2: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: '500',
    //   fontFamily: family.Bold,
    },
    text3: {
      fontSize: 13,
      fontWeight: '400',
      color: '#85929C',
    //   fontFamily: 'family.thin',
    },
    cross: {
      marginHorizontal: 20,
      height: 18,
      width: 18,
    },
    Noresult: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noresultimage: {
      height: 200,
      width: 180,
    },
  });
  export default styles;