import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactionModal from '../../components/reaction';
import CustomModal from '../../components/delete';

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();

  // const user=route.params.name;
  // console.log('ii',route.params);
  const user = route?.params?.data;
  // console.log('aaa',route.params.data);

  // console.log('ooo',user);
  // console.log('uuuu',route);


  // console.log(route.params.id)
  const { color, profileImg, name, id } = route?.params?.data;
  // console.log('sss',route.params.data);

  const chatId = route?.params?.data?.id;
  // console.log('hhh',chatId);

  const [messages, setMessages] = useState([{}]);
  const refRBSheet = useRef();

  const [toggle, setToggle] = useState(false);

  const [reactionModal, setReactionModal] = useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState<number | null>(
    null
  );
  const [reactions, setReactions] = useState<{ [key: number]: string }>({});
  const [isCustomModalVisible, setCustomModalVisible] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
          {
            _id: 1,
            text: "Hello",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          }
        ]);
      }
    };

    loadMessages();
  }, [chatId]);

  //   const initialMessages = [
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ];
  //   setMessages(initialMessages);
  // }, []);

  const onSend = async (newMessages: IMessage[] = []) => {

    setMessages((previousMessages) => {
      const updatedMessages = GiftedChat.append(previousMessages, newMessages);
      AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
      storeChatUser(user);
      console.log(updatedMessages)
      // console.log('dddd',user);
      return updatedMessages;
    });
  };

  const storeChatUser = async (User) => {

    const storedChatUsers = await AsyncStorage.getItem('chatUsers');

    const chatUsers = storedChatUsers ? JSON.parse(storedChatUsers) : [];


    const userExists = chatUsers.find((u) => u._id === User._id);
    if (!userExists) {
      chatUsers.push({ _id: User.id, name: User.name, avatar: User.profileImg });
      await AsyncStorage.setItem('chatUsers', JSON.stringify(chatUsers));

    }
  };

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 10 }}>
        <Image source={Icons.messagePlusIcon} style={styles.plusmessage} />
      </TouchableOpacity>
    );
  }, []);




  const onLongPress = (context:any, message:any) => {
    setMessageIdToDelete(message._id); 
    console.log('id',message)
    setReactionModal(true);
  };

  const handleDeletes = async (id:number) => {
    console.log('id is',id);
    
    const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
    const messagesArray = storedMessages ? JSON.parse(storedMessages) : [];

    if (Array.isArray(messagesArray)) {
      const updatedMessagesArray = messagesArray.filter(
        (message) => message._id !== id
      );
      await AsyncStorage.setItem(
        `messages_${chatId}`,
        JSON.stringify(updatedMessagesArray)
      );
      setMessages(updatedMessagesArray); 
      setToggle(!toggle);
    } else {
      console.error("Parsed messages is not an array:", messagesArray);
    }
  };

  const closeReactionModal = () => {
    setReactionModal(false);
    // setCustomModalVisible(true);
  };
  const openCustomModal = () => {
    setCustomModalVisible(true);
    closeReactionModal();
  };
  const closeCustomModal = () => {
    setCustomModalVisible(false);
  };

  const handleEmojiPress = (emoji: string) => {
    if (messageIdToDelete) {
      setReactions((prevReactions) => ({
        ...prevReactions,
        [messageIdToDelete]: emoji,
      }));
    }
    closeReactionModal();
  };

  const renderSend = (props) => {
    // console.log('propsrenderSend', props)
    return (
      <TouchableOpacity
        style={{ alignSelf: 'center', paddingHorizontal: 10 }}
        onPress={() => {
          onSend();
          props?.onSend([
            {
              _id: 1,
              text: props?.text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ])
          messages => onSend(messages);
        }}>
        <Image source={Icons.sendIcon} style={styles.sendicon} />
      </TouchableOpacity>
    );
  }


  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.backButton}>
                <Image source={Icons.backArrowIcon} style={styles.backArrow} />
              </View>
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <View style={[styles.profileImg, { backgroundColor: color }]}>
                <Text style={styles.profileText}>{profileImg}</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userStatus}>Clocked in</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => refRBSheet.current.open()}>
            <Image source={Icons.moreIcon} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{ _id: 1 }}
          placeholder="Message..."
          textInputStyle={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 10,
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                containerStyle={{
                  backgroundColor: '#F8F9F9',
                  paddingBottom: 50,
                  paddingTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...props}
              />
            );
          }}
          renderActions={renderActions}
          renderSend={renderSend}
          onLongPress={onLongPress}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get('window').height / 2.4}
        useNativeDriver={false}
        dragOnContent={true}
        style={{ overflow: 'hidden' }}
        customStyles={{
          container: {
            borderRadius: 30,
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'fade',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.RBContainer}>
          <TouchableOpacity style={styles.RBContainer2}>
            <Image source={Icons.eyeIcon} style={styles.eye} />
            <Text style={styles.RBtext}>View details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.RBContainer2}>
            <Image source={Icons.pinIcon} style={styles.pin} />
            <Text style={styles.RBtext}>Pin Chart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.RBContainer2}>
            <Image source={Icons.search} style={styles.search} />
            <Text style={styles.RBtext}>Search Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.RBContainer2}>
            <Image source={Icons.deleteIcon} style={styles.delete} />
            <Text style={styles.RBtext}>Delete</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      <ReactionModal
        visible={reactionModal}
        closeModal={closeReactionModal}
        onEmojiPress={handleEmojiPress}
        onDeletePress={openCustomModal}
      />
      <CustomModal
        visible={isCustomModalVisible}
        title="Delete Message?"
        description="Are you sure you want to delete this message?"
        imageSource={Icons.deleteIcon}
        buttonText="Yes, Delete"
        secondButtonText="Cancel"
        closeModal={() => setCustomModalVisible(false)}
        onButtonPress={() => {
          if (messageIdToDelete) {
            handleDeletes(messageIdToDelete);
          }
          closeCustomModal();
        }}
        onSecondButtonPress={() => {
          setCustomModalVisible(false);
        }}
      />
    </>
  );
};

export default ChatScreen;

