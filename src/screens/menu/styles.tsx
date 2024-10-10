import {StyleSheet} from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: colors.darkBlue,
  },
  containerMain: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerSecond: {
    flexDirection: 'row',
  },
  
  backarrow: {
    height: 20,
    width: 20,
  },
  containerText: {
    marginLeft: 10,
  },
  textMessage: {
    fontSize: 18,
    fontFamily:fonts.italic,
    marginBottom: 3,
    color: colors.white,
    fontWeight: '600',

    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
  },
  textContact: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '400',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  notify: {
    backgroundColor: '#3E88C2',
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  bell: {
    height: 20,
    width: 20,
  },
  search: {
    height: 20,
    width: 20,
    // marginTop:20,
    marginRight: 10,
  },
  MainBody: {
    flex: 1,
    backgroundColor: '#E7EDF3',
  },
  searchContainer: {
    flexWrap: 'wrap',

    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 18,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 15,
    // paddingVertical: 10,
    paddingHorizontal: 15,

    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
  },
  inputcontainer: {
    width: '90%',
  },
  nochat: {
    height: 190,
    width: 190,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textBtn: {
    color: colors.white,
    fontSize: 16,
  },


  plus: {
    height: 25,
    width: 25,
  },
  FlatListMainContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginVertical: 16,
    marginBottom:20,
    paddingHorizontal: 20,
    borderRadius: 10,
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
  nameText:{
    fontWeight:'bold',
    alignSelf:'center',
    textAlign:'center',
    padding:8,
    justifyContent:'center',
    alignItems:'center',
      },
  
  
  containerBtnImg:{
    flex: 1, 
    justifyContent: 'center',
     alignItems: 'center'
    },

    addchat: {
      position: 'absolute',
      height: 50, 
      width: 50,  
      borderRadius: 25, 
      backgroundColor: '#B0BEC5', 
      justifyContent: 'center',
      alignItems: 'center',
      right: 15,
      bottom: 20,
      elevation: 5, 
    },

    addSize:{ 
      height: 25,
       width: 25, 
       tintColor: colors.white ,
      },

      searchContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 18,
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingVertical: 16,
        paddingHorizontal: 15,
       
      },
      
      inputcontainer1: {
        flex: 1,
        marginRight: 10, 
      },
      
      clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      crossIcon: {
        height: 20, 
        width: 20,
        tintColor: '#A9A9A9', 
      },
      
      
});

export default styles;