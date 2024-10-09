import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import ChatBottomSheet from '../../components/chatbottomsheet';
import styles from './styles';
import ListItem from '../../components/contact';

const MenuScreen = ({ navigation }: any) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    const loadChatUsers = async () => {
      const storedChat = await AsyncStorage.getItem('chatUsers');
      setChatUsers(storedChat ? JSON.parse(storedChat) : []);
    };
    loadChatUsers();
  }, [chatUsers]); 

  const filteredUsers = searchQuery
    ? chatUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : chatUsers;

  const navigateToChat = useCallback((user) => {
    navigation.navigate('Chat', { data: user });
  }, [navigation]);

  const initiateNewChat = () => {
    navigation.navigate('Search');
    setBottomSheetVisible(false);
  };

  const renderEmptyState = () => (
    <View style={styles.containerBtnImg}>
      <Image source={Images.noChat} style={styles.nochat} />
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? '#2A7BBB' : '#2A7BBB' },
          styles.pressable,
        ]}
        onPress={() => setBottomSheetVisible(true)}
      >
        <Text style={styles.textBtn}>Start Chat</Text>
      </Pressable>
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.Noresult}>
      <Image source={Images.noResultFound} style={styles.noresultimage} />
      <Text>No results found</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.containerMain}>
          <View style={styles.containerSecond}>
            <View style={styles.containerText}>
              <Text style={styles.textMessage}>Messages</Text>
              <Text style={styles.textContact}>{chatUsers.length} Contacts</Text>
            </View>
          </View>
          <View style={styles.notify}>
            <Image source={Icons.bellIcon} style={styles.bell} />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.MainBody}>
        <View style={styles.searchContainer1}>
          <Image source={Icons.search} style={styles.search} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.inputcontainer1}
            placeholder="Search messages..."
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Image source={Icons.crossIcon} style={styles.crossIcon} />
            </Pressable>
          )}
        </View>

        {chatUsers.length === 0 ? (
          renderEmptyState()
        ) : filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            bounces={false}
            renderItem={({ item }) => (
              <ListItem item={item} onPress={() => navigateToChat(item)} />
            )}
            style={styles.FlatListMainContainer}
          />
        ) : (
          renderNoResults() 
        )}
      </View>

      {chatUsers.length > 0 && (
        <TouchableOpacity onPress={() => setBottomSheetVisible(true)} style={styles.addchat}>
          <Image source={Icons.plusIcon} style={styles.addSize} />
        </TouchableOpacity>
      )}

      <ChatBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onPressNewChatOption={initiateNewChat}
        navigation={navigation}
      />
    </>
  );
};

export default MenuScreen;
