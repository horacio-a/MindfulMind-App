import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, Image, ActivityIndicator } from 'react-native';

import Constants from 'expo-constants';


export default function Loading() {

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../img/mwhite.png')} style={styles.Img} />
            <ActivityIndicator size="large" color={'#fff'} style={styles.Loading} />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Img: {
        width: 210,
        height: 210

    },

    bigblock: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',

    },
    Width100: {
        width: '100%',
    }
});
