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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contact from '../../components/contact';

const MenuScreen = ({navigation}) => {
  const [storedchats, setstoredchats] = useState([]);
  const [chatUsers, setchatUsers] = useState([]);
  const [searchfilter, setsearchfilter] = useState('');
  const [filtersearch, setfiltersearch] = useState([]);
  const [hasSearch, setHasSearched] = useState(false);

  const loadChatUsers = async () => {
    const storedchat = await AsyncStorage.getItem('chatUsers');
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
    if (query.length > 0) {
      setHasSearched(true);
    } else {
      setHasSearched(false);
    }
    setsearchfilter(query);
    if (query) {
      const filterme = storedchats.filter(contact =>
        contact.name.includes(query),
      );
      setfiltersearch(filterme);
    } else {
      setfiltersearch([]);
    }
  };

  const refRBSheet = useRef();
  const handleNavigation = useCallback(item => {
    navigation.navigate('Chat', {data: item});
  }, []);
  return (
    <>
      <SafeAreaView style={styles.safeareaview}>
        <View style={styles.container1}>
          <View style={styles.container2}>
            {/* <View style={styles.container3}>
              <Image source={icon.backarrow} style={styles.backarrow} />
            </View> */}
            <View style={styles.container4}>
              <Text style={styles.text1}>Messages</Text>
              <Text style={styles.text2}>45 Contacts</Text>
            </View>
          </View>
          <View style={styles.container5}>
            <Image source={Icons.plusIcon} style={styles.bell} />
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
                  renderItem={({item, index}) => (
                    <Contact
                      item={item}
                      onPress={() => handleNavigation(item)}
                    />
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
                renderItem={({item, index}) => (
                  <Contact item={item} onPress={() => handleNavigation(item)} />
                )}
              />
            </View>
          )
        ) : (
          <View
            style={styles.container8}>
            <View>
              <Image source={Images.noChat} style={styles.nochat} />
              <Pressable
                style={({pressed}) => [
                  {backgroundColor: pressed ? '#2A7BBB' : '#2A7BBB'},
                  styles.pressable,
                ]}
                onPress={() => refRBSheet.current.open()}>
                <Text style={styles.text3}>Start Chat</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      {storedchats?.length > 0 && (
        <TouchableOpacity onPress={() => [navigation.navigate('Search')]}>
          <Image source={Icons.plusIcon} style={styles.addchat} />
        </TouchableOpacity>
      )}
      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get('window').height / 6}
        useNativeDriver={false}
        dragOnContent={true}
        style={{overflow: 'hidden'}}
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
          <TouchableOpacity
            style={styles.RBContainer2}
            onPress={() => [
              navigation.navigate('Search'),
              refRBSheet.current.close(),
            ]}>
            <Image source={Icons.plusIcon} style={styles.plus} />
            <Text style={styles.RBtext}>New Chat</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

export default MenuScreen;