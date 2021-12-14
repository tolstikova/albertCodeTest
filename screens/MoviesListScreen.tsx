import * as React from 'react';
import {StyleSheet, FlatList, Pressable, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {RootStackScreenProps} from '../types';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../redux/reducers';
import {getFilmsList} from '../redux/films/thunks';
import {DataTable} from 'react-native-paper';
import {Film} from "../redux/films/reducers";

const SORT_TYPE = {
    title: 0,
    episodeNumber: 1,
    releasesYear: 2,
};

const MoviesListScreen = ({navigation}: RootStackScreenProps<'NotFound'>) => {
    const dispatch = useDispatch();
    const filmStore = useSelector((state: State) => state.films.films);
    const [films, setFilms] = useState<Film[]>();
    const [upSortOrder, setUpSortOrder] = useState<boolean>(true);
    const [sortType, setSortType] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!films?.length) {
            dispatch(getFilmsList());
            setFilms(filmStore);
        }
    });

    const sortBy = (type: number) => {
        setSortType(type);
        const sortMap = {
            0: () => sortByTitle(),
            1: () => sortByNumber(),
            2: () => sortByYear(),
        };
        sortMap[type]();
    };

    type MappedItem = { index: number, value: string };

    const sortByOrder = (mapped: MappedItem[]) => {
        mapped.sort((a: MappedItem, b: MappedItem) => {
            if (upSortOrder) {
                setUpSortOrder(!upSortOrder);
                if (a.value > b.value) return 1;
                if (a.value < b.value) return -1;
                return 0;
            } else {
                setUpSortOrder(!upSortOrder);
                if (a.value > b.value) return -1;
                if (a.value < b.value) return 1;
                return 0;
            }
        });
        return mapped.map((el: MappedItem) => filmStore[el.index]);
    };

    const sortByTitle = () => {
        const mapped = filmStore.map((item: Film, i: number) => {
            return {index: i, value: item.title?.toLowerCase()};
        });
        const result = sortByOrder(mapped);
        setFilms(result);
    };

    const sortByNumber = () => {
        const mapped = filmStore.map((item: Film, i: number) => {
            return {index: i, value: item.episode_id};
        });
        const result = sortByOrder(mapped);
        setFilms(result);
    };

    const sortByYear = () => {
        const mapped = filmStore.map((item: Film, i: number) => {
            return {index: i, value: item.release_date};
        });
        const result = sortByOrder(mapped);
        setFilms(result);
    };

    const navigateToMovie = (item: Film) => navigation.navigate("MovieScreen", {title: item.title, item});

    const ListItem = ({item}) => (
        <DataTable.Row style={styles.row}>
            <Pressable style={styles.row1} onPress={() => navigateToMovie(item)}>
                <DataTable.Cell>{item.title}</DataTable.Cell>
            </Pressable>
            <Pressable style={styles.row2} onPress={() => navigateToMovie(item)}>
                <DataTable.Cell>{item.episode_id}</DataTable.Cell>
            </Pressable>
            <Pressable style={styles.row3} onPress={() => navigateToMovie(item)}>
                <DataTable.Cell>{item.release_date}</DataTable.Cell>
            </Pressable>
        </DataTable.Row>
    );

    const DataTableTitle = ({title, sort}: { title: string, sort: number }) => (
        <Pressable style={styles.container} onPress={() => sortBy(sort)}>
            <View style={styles.titleContainer}>
                <DataTable.Title>
                    <Text style={styles.title}>{title}</Text>
                </DataTable.Title>
                {(sort === sortType) && <AntDesign name={upSortOrder ? "down" : "up"} size={12} color="black"/>}
            </View>
        </Pressable>
    );

    return (
        <DataTable>
            <DataTable.Header>
                <DataTableTitle title='Title' sort={SORT_TYPE.title}/>
                <DataTableTitle title='Episode number' sort={SORT_TYPE.episodeNumber}/>
                <DataTableTitle title='Released year' sort={SORT_TYPE.releasesYear}/>
            </DataTable.Header>
            <FlatList data={films} renderItem={ListItem}/>
        </DataTable>
    );
};

export default MoviesListScreen;

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
    row: {flex: 1},
    row1: {flex: 0.6},
    row2: {flex: 0.1},
    row3: {flex: 0.3},
});
