import * as React from 'react';
import {StyleSheet, FlatList, Pressable, View, Text} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {RootStackScreenProps} from '../types';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../redux/reducers';
import {Modal, Portal, Provider} from 'react-native-paper';
import {getCharacters, getSpecies} from '../redux/films/thunks';
import {Character} from '../redux/films/reducers';


const MovieScreen = ({navigation, route}: RootStackScreenProps<'NotFound'>) => {
    const dispatch = useDispatch();
    const charactersStore = useSelector((state: State) => state.films.characters);
    const speciesStore = useSelector((state: State) => state.films.species);
    const {title, episode_id, release_date, characters} = route.params.item;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(getCharacters(characters));
    }, []);

    const showModal = (item: Character) => {
        dispatch(getSpecies(item.species));
        if (speciesStore[0]) {
            setVisible(true);
        }
    };
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 40, marginHorizontal: 20};


    const TopCharactersItem = ({index, item}: { index: number, item: Character }) => (
        <Pressable onPress={() => showModal(item)}>
            <Text style={styles.chart}>
                <Text>{index + 1}. </Text>
                <Text>{item.name} </Text>
                <Text>({item.gender}) </Text>
                <AntDesign name='right' size={15} color='black'/>
            </Text>
        </Pressable>
    );

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text style={styles.title}>Species</Text>
                    <Text>Name: {speciesStore[0]?.name}</Text>
                    <Text>Classification: {speciesStore[0]?.classification}</Text>
                    <Text>Designation: {speciesStore[0]?.designation}</Text>
                    <Text>Average height: {speciesStore[0]?.average_height}</Text>
                    <Text>Skin colors: {speciesStore[0]?.skin_colors}</Text>
                    <Text>Hair colors: {speciesStore[0]?.hair_colors}</Text>
                    <Text>Eye colors: {speciesStore[0]?.eye_colors}</Text>
                    <Text>Language: {speciesStore[0]?.language}</Text>
                </Modal>
            </Portal>
            <View style={{backgroundColor: 'rgb(0,0,0, 0.0)', padding: 60}}>
                <Text style={styles.title}>Title: </Text>
                <Text style={styles.content}>{title}</Text>
                <Text style={styles.title}>Episode number: </Text>
                <Text style={styles.content}>{episode_id}</Text>
                <Text style={styles.title}>Release date: </Text>
                <Text style={styles.content}>{release_date}</Text>
                <Text style={styles.title}>Top 5 characters: </Text>
                <FlatList
                    data={charactersStore}
                    renderItem={TopCharactersItem}
                />
            </View>
        </Provider>


    );
};

export default MovieScreen;

const styles = StyleSheet.create({
    container: {flex: 0.4},
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        alignItems: 'center',
        paddingRight: 10
    },
    title: {
        fontFamily: 'bangers',
        fontSize: 15,
        color: '#312F32'
    },
    content: {paddingBottom: 20, paddingTop: 5},
    chart: {paddingTop: 5, paddingBottom: 5},
    row: {flex: 1},
    row1: {flex: 0.6},
    row2: {flex: 0.1},
    row3: {flex: 0.3},
});
