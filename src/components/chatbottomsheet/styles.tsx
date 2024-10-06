import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6EDF3',
    borderRadius: 50,
  },
  bgColor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerImage: {
    marginTop: 32,
    marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageSize: {
    height: 148,
    width: 111,
  },
  commonMargin: {
    marginHorizontal: 33,
    marginTop: 24,
  },
  headingText: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 24,
  },

  lineView: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginVertical: 22,
  },

  marginSpace:{
    marginBottom:12,
  },
  containerTop1: {
    flexDirection: 'row',
  },
  imgSize: {
    height: 24,
    width: 24,
  },
  forwardContainer:{
    justifyContent:'center',
    marginRight:20,
  },
  imgForward:{
    width:6,
    height:10,
  },
  containerTop2: {
    flexDirection: 'column',
    marginStart: 14,
    justifyContent:'center'
  },
  textName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000CC',
  },
  text2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A7BBB',
    marginTop: 10,
  },







  headingDescription: {
    marginTop: 8,
    color: '#4D5876',
    fontWeight: '400',
    fontSize: 15,
  },
  marginSide: {
    marginTop:36,
    marginHorizontal: 24,
  },
  iconSize: {
    height: 55,
    width: 55,
    resizeMode:'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#122636',
    marginTop: -2,
    marginStart: 4,
  },

  btnContainer: {
    backgroundColor: '#2A7BBB',
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  getStartedBtn: {
    color: '#ffffff',
    paddingVertical: 17,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
});
export default styles;
