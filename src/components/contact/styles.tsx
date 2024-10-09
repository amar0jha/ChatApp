import { StyleSheet } from "react-native";
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Dimensions,
  } from 'react-native';
import { colors } from "../../theme/colors";
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    FlatListContainer: {
      flexDirection: 'row',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBlockColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    profileImg: {
      borderRadius: 50,
      padding: 16,
    },
    containerMid: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '85%',
    },
    textGap:{
        marginHorizontal:20,
    },
  
    profilePic: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    textName: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: '500',
    },
    textMsg: {
      fontSize: 13,
      fontWeight: '400',
      color: '#85929C',
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