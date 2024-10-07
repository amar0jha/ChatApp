import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contact from '../../components/contact';
import { colors } from '../../theme/colors';
import ChatBottomSheet from '../../components/chatbottomsheet';

const MenuScreen = ({ navigation }:any) => {
  const [storedchats, setstoredchats] = useState([]);
  const [searchfilter, setsearchfilter] = useState('');
  const [filtersearch, setfiltersearch] = useState([]);
  const [hasSearch, setHasSearched] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const loadChatUsers = async () => {
    const storedchat = await AsyncStorage.getItem('chatUsers');
    console.log(storedchat);
    if (storedchat) {
      const chat = storedchat ? JSON.parse(storedchat) : [];
      setstoredchats(chat);
    } else {
      setstoredchats([]);
    }
  };

  useEffect(() => {
    loadChatUsers();
  }, []);

  const functionfilter = query => {
    setHasSearched(query.length > 0);
    setsearchfilter(query);
    const filterme = storedchats.filter(contact => 
      contact.name.includes(query)
    );
    setfiltersearch(query ? filterme : []);
    console.log(filtersearch);
  };

  const handleNavigation = useCallback((item)=>{
    console.log(item);
    navigation.navigate('Chat', {data : item})
  },[])

  const handleNewChat = () => {
    navigation.navigate('Search');
    setBottomSheetVisible(false); 
  };

  return (
    <>
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container1}>
          <View style={styles.container2}>
            <View style={styles.container4}>
              <Text style={styles.text1}>Messages</Text>
              <Text style={styles.text2}>45 Contacts</Text>
            </View>
          </View>
          <View style={styles.container5}>
            <Image source={Icons.bellIcon} style={styles.bell} />
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.container6}>
        <View style={styles.container7}>
          <Image source={Icons.search} style={styles.search} />
          <TextInput
            value={searchfilter}
            onChangeText={text => functionfilter(text)}
            style={styles.inputcontainer}
            placeholder="Search messages..."
          />
        </View>

        {storedchats?.length > 0 ? (
          hasSearch ? (
            filtersearch.length > 0 ? (
              <View style={styles.FlatListMainContainer}>
                <FlatList
                  data={filtersearch}
                  bounces={false}
                  renderItem={({ item }) => (
                    <Contact item={item} onPress={() => handleNavigation(item)} />
                  )}
                />
              </View>
            ) : (
              <View style={styles.Noresult}>
                <Image source={Images.noChat} style={styles.noresultimage} />
              </View>
            )
          ) : (
            <View style={styles.FlatListMainContainer}>
              <FlatList
                data={storedchats}
                renderItem={({ item }) => (
                  <Contact item={item} onPress={() => handleNavigation(item)} />
                )}
              />
            </View>
          )
        ) : (
          <View style={styles.container8}>
            <View>
              <Image source={Images.noChat} style={styles.nochat} />
              <Pressable
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#2A7BBB' : '#2A7BBB' },
                  styles.pressable,
                ]}
                onPress={() => setBottomSheetVisible(true)}>
                <Text style={styles.text3}>Start Chat</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>

      {storedchats?.length > 0 && (
        <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
          <Image source={Icons.plusIcon} style={styles.addchat} />
        </TouchableOpacity>
      )}

      <ChatBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onPressNewChatOption={handleNewChat}
        navigation={navigation}
      />
    </>
  );
};

export default MenuScreen;
