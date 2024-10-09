import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.white,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#E7EDF3',
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    height: 20,
    width: 20,
  },
  userInfo: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  profileImg: {
    borderRadius: 100,
    padding: 13,
  },
  profileText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '600',
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '600',
    marginBottom: 2,
  },
  userStatus: {
    fontSize: 13,
    color: '#838D95',
    fontWeight: '300',
  },
  moreContainer: {
    borderRadius: 10,
    padding: 10,
  },
  moreIcon: {
    height: 40,
    width: 40,
  },
  plusmessage: {
    height: 22,
    width: 22,
  },
  sendicon: {
    height: 40,
    width: 40,
  },
  RBContainer: {
    borderRadius: 20,
    paddingTop: 14,
    flex: 1,
  },
  messageContainer: {
    borderRadius: 10,
    maxWidth: "80%",
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: "relative",
  },
  userMessage: {
    backgroundColor: "#0084ff",
  },
  otherMessage: {
    backgroundColor: "#f0f0f0",
  },
  messageText: {
    fontSize: 16,
  },
  reactionContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  timeText: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 10,
    color: colors.black,
  },
  msgTimeContainer:{
     marginBottom: 5 ,
    },
});
