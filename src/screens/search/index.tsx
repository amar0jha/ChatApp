import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import styles from './styles';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import contactsData from '../../data.json' 
import { ScreenNames } from '../../navigator/screenname';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
     console.log(searchQuery);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setHasSearched(true);
        if (query) {
            const filtered = contactsData.filter(contact => contact.name.includes(query)
            );
            setFilteredContacts(filtered);
        } else {
            setFilteredContacts([]);
        }
    };

    const clearSearch = () => {
      setSearchQuery('');
      setFilteredContacts([]);
      setHasSearched(false);
  };

  const handleNavigation = useCallback((item)=>{
    
    navigation.navigate('Chat', {data : item})
  },[])
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <View style={styles.backBox}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={Icons.backArrowIcon} style={styles.backIcon} />
                    </TouchableOpacity>
                </View>
               
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Search Here..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                       <TouchableOpacity onPress={clearSearch}>
                        <Image source={Icons.crossIcon} style={styles.crossBtn} />
                    </TouchableOpacity>

                </View>
            </View>

            {hasSearched ? (
                filteredContacts.length > 0 ? (
                   
                    
                    <View style={styles.listContainer}>
                        
                    <FlatList
                        data={filteredContacts}
                       keyExtractor={(item) => item.id.toString()}

                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>handleNavigation(item)}>
                                
                            <View style={styles.box1}>
                                <View style={{backgroundColor:item.color,borderRadius:50,}}>
                              <View style={styles.profileBg}>
                                   <Text style={styles.text1}>{item.profileImg}</Text>
                                   </View>
                                   </View>
                                <Text style={styles.text}>{item.name}</Text>
                            </View>
                            <View style={styles.lineView}></View>
                            </TouchableOpacity>
                          
                        )}
                    />
                    </View>
                ) : (
                    <View style={styles.box}>
                        <Image source={Images.noResultFound} style={styles.image} />
                        <Text style={styles.text}>No Results Found</Text>
                    </View>
                )
            ) : null}
        </SafeAreaView>
    );
};

export default SearchScreen;