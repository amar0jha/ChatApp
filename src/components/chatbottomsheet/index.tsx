import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Icons } from '../../assets/icons';
import styles from './styles';

interface ChatBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onPressNewChatOption: () => void;
  navigation: {
    navigate: (screen: string) => void;
  };
}

const ChatBottomSheet: React.FC<ChatBottomSheetProps> = ({
  visible,
  onClose,
  onPressNewChatOption,
  navigation,
}) => {
  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    if (visible) {
      refRBSheet.current?.open();
    } else {
      refRBSheet.current?.close();
    }
  }, [visible]);

  // const handleNavigation = (screen: string) => {
  //   navigation.navigate(screen); 
  //   onClose(); 
  // };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressMask
      useNativeDriver={false}
      height={Dimensions.get('window').height / 3.3}
      style={{ overflow: 'hidden' }}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
          borderRadius: 20,
        },
      }}
      onClose={onClose}
    >
      <View style={styles.bgColor}>
        <View style={styles.marginSide}>
          <ScrollView>
            <TouchableOpacity onPress={onPressNewChatOption}>
              <View style={styles.containerTop1}>
                <Image source={Icons.newChatIcon} style={styles.imgSize} />
                <View style={styles.containerTop2}>
                  <Text style={styles.textName}>New Chat</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.lineView}></View>

            <TouchableOpacity >
              <View style={styles.containerTop1}>
                <Image source={Icons.newGroupChatIcon} style={styles.imgSize} />
                <View style={styles.containerTop2}>
                  <Text style={styles.textName}>New Group Chat</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.lineView}></View>

            <TouchableOpacity >
              <View style={styles.containerTop1}>
                <Image source={Icons.announcementIcon} style={styles.imgSize} />
                <View style={styles.containerTop2}>
                  <Text style={styles.textName}>New Announcement</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </RBSheet>
  );
};

export default ChatBottomSheet;
