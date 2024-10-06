import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: colors.skyblue,
  },
  backBox: {
    backgroundColor: "#FFFFFF",
    width: "15%",
    marginRight:10,
   
    borderRadius: 10
  },
  backButton: {
  
  },
  backIcon: {
    width: 23,
    height: 15,
    alignSelf: 'center',
    marginTop:20,
  },
  searchBox: {
 flexDirection:'row',
 justifyContent:'space-between',
    backgroundColor: colors.white,
    borderRadius: 15,
    width:'80%',
    paddingVertical:20,
    padding:15,

 
  },

  crossBtn:{
    width:20,
    height:20,
  },
  
  searchText: {
    color: colors.midGrey,
  },
  search:{
    flexDirection:'row',
    margin:10,
    justifyContent:'space-around'
  },
  profileBg:{
    // backgroundColor:colors.midGrey,
    width:40,
    height:40,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
  },
  text1:{
    fontWeight:'bold',
    alignSelf:'center',
    textAlign:'center',
    padding:8,
    color:colors.white,
    justifyContent:'center',
    alignItems:'center',
      },
  text:{
    fontWeight:'bold',
    alignSelf:'center',
    textAlign:'center',
    padding:8,
    justifyContent:'center',
    alignItems:'center',
      },
      image:{
   width:166,
   height:135,
      },
      lineView: {
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        marginHorizontal: 18,
      },
      box: {
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY: 230 }],
      },
      listContainer: {
        padding: 1,
        alignContent: 'space-between',
        backgroundColor: '#F8F9F9',
        margin: 14,
        borderRadius: 20,
    
      },
      box1:{
        flexDirection:'row',
        gap:10,
        marginHorizontal:16,
        marginVertical:13,
      }

})
