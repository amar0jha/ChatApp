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
import EmojiModal from '../../components/reaction';
import DeleteModal from '../../components/delete';
import BottomSheetOption from '../../components/customsheet';
import { strings } from '../../theme/string';

const ChatScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const userData = route?.params?.data;
  const { color, avatar, name, id } = userData;
  const chatId = route.params.data.id;

  const [chatMessages, setChatMessages] = useState([{}]);
  const bottomSheetRef = useRef();
  const [isChatVisible, setChatVisible] = useState(false);
  const [isReactionModalVisible, setReactionModalVisible] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState<number | null>(null);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentInputText, setCurrentInputText] = useState('');

  useEffect(() => {
    const loadChatMessages = async () => {
      const storedMessages = await AsyncStorage.getItem(`messages_${chatId}`);
      if (storedMessages) {
        setChatMessages(JSON.parse(storedMessages));
      } else {
        setChatMessages([
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

    loadChatMessages();
  }, [chatId]);

  const handleSendMessages = async (newMessages: IMessage[] = []) => {
    setChatMessages((previousMessages) => {
      const updatedMessages = GiftedChat.append(previousMessages, newMessages);
      AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
      storeChatUser(userData);
      return updatedMessages;
    });
    setCurrentInputText('');
  };

  const storeChatUser = async (user: any) => {
    const storedChatUsers = await AsyncStorage.getItem('chatUsers');
    const chatUsers = storedChatUsers ? JSON.parse(storedChatUsers) : [];
    const userExists = chatUsers.find((u: any) => u.id === user.id);
 
    if (!userExists) {
      chatUsers.push({ id: user.id, name: user.name, avatar: user.avatar, color: user.color });
      await AsyncStorage.setItem('chatUsers', JSON.stringify(chatUsers));
    }
  };

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    const isUserMessage = currentMessage.user._id === 1;
    const messageTime = new Date(currentMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  
    return (
      <>
        <TouchableOpacity
          onLongPress={() => handleLongPress(null, currentMessage)}
          style={[
            styles.messageContainer,
            isUserMessage ? styles.userMessage : styles.otherMessage,
            { alignSelf: isUserMessage ? "flex-end" : "flex-start" }
          ]}
        >
          <Text
            style={{
              color: isUserMessage ? "white" : "black",
              ...styles.messageText,
            }}
          >
            {currentMessage.text}
          </Text>
          {currentMessage.reaction && (
            <View
              style={[
                styles.reactionContainer,
                {
                  position: 'absolute',
                  left: isUserMessage ? -7 : 'auto', 
                  right: isUserMessage ? 'auto' : -7, 
                  top: -16,
                }
  
              ]}
            >
              <Text style={{ color: isUserMessage ? "white" : "black" }}>
                {currentMessage.reaction}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.timeText,
            { textAlign: isUserMessage ? "right" : "left", left: 10 }
          ]}
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

  const handleLongPress = (context: any, message: any) => {
    setMessageToDeleteId(message._id); 
    setReactionModalVisible(true);
  };

  const handleDeleteMessage = async (id: number) => {
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
      setChatMessages(updatedMessagesArray); 
      setChatVisible(!isChatVisible);
    } else {
      console.error("Passed messages is not an array:", messagesArray);
    }
  };

  const closeReactionModal = () => {
    setReactionModalVisible(false);
  };
  
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
    closeReactionModal();
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleEmojiSelection = async (emoji: string) => {
    if (messageToDeleteId) {
      setChatMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) => {
          if (msg._id === messageToDeleteId) {
            return {
              ...msg,
              reaction: msg.reaction === emoji ? null : emoji,
            };
          }
          return msg;
        });
        AsyncStorage.setItem(`messages_${chatId}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    }
    closeReactionModal();
  };

  const renderSend = (props: any) => {
    return (
      <TouchableOpacity
        style={{ alignSelf: 'center', paddingHorizontal: 10 }}
        onPress={() => {
          const messageText = currentInputText.trim();
          if (messageText) {
            handleSendMessages();
            props.onSend([
              {
                _id: 1,
                text: messageText,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },
            ]);
            setCurrentInputText('');
          }
        }}>
        <Image source={Icons.sendIcon} style={styles.sendicon} />
      </TouchableOpacity>
    );
  };
  

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
                <Text style={styles.userStatus}>{strings.cockedIn}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.moreContainer}
            onPress={() => bottomSheetRef.current.open()}>
            <Image source={Icons.moreIcon} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={chatMessages}
          onSend={messages => handleSendMessages(messages)}
          user={{ _id: 1 }}
          alignTop={true}
          placeholder="Message..."
          textInputStyle={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 10,
          }}
          onInputTextChanged={setCurrentInputText}
          text={currentInputText}
          renderInputToolbar={props => (
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
          )}
          renderActions={renderActions}
          renderSend={renderSend}
          onLongPress={handleLongPress}
          renderMessage={renderMessage}
        />
      </View>
      <RBSheet
        ref={bottomSheetRef}
        height={Dimensions.get('window').height / 3}
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
      >

<View style={styles.RBContainer}>
  <BottomSheetOption
    icon={Icons.eyeIcon}
    text="View details"
    onPress={() => {/* function */}}
  />
  
  <BottomSheetOption
    icon={Icons.pinIcon}
    text="Pin Chat"
    onPress={() => {/* function */}}
  />
  
  <BottomSheetOption
    icon={Icons.search}
    text="Search Chat"
    onPress={() => {/* function */}}
  />
  
  <BottomSheetOption
    icon={Icons.deleteIcon}
    text="Delete"
    onPress={() => {/* function */}}
  />
</View>

      </RBSheet>
      <EmojiModal
        visible={isReactionModalVisible}
        closeModal={closeReactionModal}
        onClickEmoji={handleEmojiSelection}
        onClickDelete={openDeleteModal}
      />
      <DeleteModal
        visible={isDeleteModalVisible}
        title="Delete Message?"
        description="Are you sure you want to delete this message?"
        imageSource={Icons.deleteIcon}
        buttonText="Yes, Delete"
        secondButtonText="No, Cancel"
        closeModal={closeDeleteModal}
        onButtonPress={() => {
          if (messageToDeleteId) {
            handleDeleteMessage(messageToDeleteId);
          }
          closeDeleteModal();
        }}
        onCancelButtonPress={closeDeleteModal}
      />
    </>
  );
};

export default ChatScreen;

