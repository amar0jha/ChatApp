import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export default StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#FFFFFF',
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
        color: '#FFFFFF',
        fontWeight: '600',
      },
      userDetails: {
        marginLeft: 10,
      },
      userName: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 2,
      },
      userStatus: {
        fontSize: 13,
        color: '#838D95',
        fontWeight: '300',
      },
      notificationContainer: {
        // backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
      },
      notificationIcon: {
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
        paddingHorizontal: 24,
        borderRadius: 30,
        paddingTop: 2,
        flex: 1,
      },
      RBContainer2: {
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      RBtext: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '400',
      },
      eye: {
        height: 20,
        width: 26,
      },
      pin: {
        height: 25,
        width: 18,
        marginLeft: 4,
      },
      search: {
        height: 25,
        width: 24,
        marginLeft: 4,
      },
      delete: {
        height: 25,
        width: 24,
        marginLeft: 4,
      },
    });