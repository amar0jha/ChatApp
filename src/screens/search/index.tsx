import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import styles from './styles';
import { Icons } from '../../assets/icons';
import { Images } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import contactsData from '../../data.json';
import { strings } from '../../theme/string';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContactsList = useMemo(() => {
        if (!searchTerm) return [];
        return contactsData.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const resetSearch = () => setSearchTerm('');

    const navigateToChatScreen = useCallback((contact) => {
        navigation.navigate('Chat', { data: contact });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <View style={styles.backContainer}>
                    <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <Image source={Icons.backArrowIcon} style={styles.backIcon} />
                    </TouchableOpacity>
                </View>
               
                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Search Here..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity onPress={resetSearch}>
                        <Image source={Icons.crossIcon} style={styles.crossBtn} />
                    </TouchableOpacity>
                </View>
            </View>

            {searchTerm && (
                filteredContactsList.length > 0 ? (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={filteredContactsList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigateToChatScreen(item)}>
                                    <View style={styles.containerItem}>
                                        <View style={{ backgroundColor: item.color, borderRadius: 50 }}>
                                            <View style={styles.profileBg}>
                                                <Text style={styles.avtImg}>{item.avatar}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.nameText}>{item.name}</Text>
                                    </View>
                                    <View style={styles.lineView}></View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ) : (
                    <View style={styles.containerNf}>
                        <Image source={Images.noResultFound} style={styles.image} />
                        <Text style={styles.nameText}>{strings.noResultFound}</Text>
                    </View>
                )
            )}
        </SafeAreaView>
    );
};

export default SearchScreen;
