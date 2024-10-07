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

const ChatScreen = ({ route }: any) => {
  // console.log(route.params);
  const navigation = useNavigation();

  // const user=route.params.name;
  // console.log('ii',route.params);
  const user = route?.params?.data;
  // console.log('aaa',route.params.data);

  // console.log('ooo',user);
  // console.log('uuuu',route);


  // console.log(route.params.id)
  const { color, avatar, name, id } = route?.params?.data;
  // console.log('sss',route.params.data);

  const chatId = route.params.data.id;

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
    // console.log('message',newMessages);
    setMessages((previousMessages) => {
      console.log('prec]viousMethod',previousMessages);
      const updatedMessages = GiftedChat.append(previousMessages, newMessages);
      console.log(chatId);
      AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
     
      
      storeChatUser(user);
      // console.log(updatedMessages)
      // console.log('dddd',user);
      return updatedMessages;
    });
  };

  const storeChatUser = async (User:any) => {

    const storedChatUsers = await AsyncStorage.getItem('chatUsers');


    const chatUsers = storedChatUsers ? JSON.parse(storedChatUsers) : [];


    const userExists = chatUsers.find((u:any) => u.id === user.id);
 
    if (!userExists) {
      chatUsers.push({ id: user.id, name: user.name, avatar: user.avatar ,color:user.color});
      await AsyncStorage.setItem('chatUsers', JSON.stringify(chatUsers));

    }
  };
  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    const isUserMessage = currentMessage.user._id === 1;
    const messageTime = new Date(currentMessage.createdAt).toLocaleTimeString([],{
        hour: "2-digit",
        minute: "2-digit",
      }
    );
    return (
      <>
        <TouchableOpacity
          onLongPress={() => onLongPress(null, currentMessage)}
          style={{
            alignSelf: isUserMessage ? "flex-end" : "flex-start",
            backgroundColor: isUserMessage ? "#0084ff" : "#f0f0f0",
            borderRadius: 10,
            maxWidth: "80%",
            marginHorizontal: 15,
            marginBottom: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            position: "relative",
          }}
        >
          <Text
            style={{
              color: isUserMessage ? "white" : "black",
              fontSize: 16,
            }}
          >
            {currentMessage.text}
          </Text>
          {currentMessage.reaction && (
            <View
              style={{
                top: -12,
                position: "absolute",
                left: isUserMessage ? -16 : 50,
                padding: 5,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: isUserMessage ? "white" : "black" }}>
                {currentMessage.reaction}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            fontSize: 10,
            color: "black",
            textAlign: isUserMessage ? "right" : "left",
            left: 10,
          }}
        >
          {messageTime}
        </Text>
      </>
    );
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

  const handleEmojiPress = async (emoji: string) => {
    if (messageIdToDelete) {
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) => {
          if (msg._id === messageIdToDelete) {
            return {
              ...msg,
              reaction: msg.reaction === emoji ? null : emoji,
            };
          }
          return msg;
        });
        // console.log("ooooooooo", updatedMessages);
        AsyncStorage.setItem(`messages_${chatId}`,JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    }
    closeReactionModal();
  };
  const renderSend = (props:any) => {
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
          // messages => onSend(messages);
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
                <Text style={styles.profileText}>{avatar}</Text>
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
          alignTop={true}
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
          renderMessage={renderMessage}
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
        secondButtonText="No, Cancel"
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

