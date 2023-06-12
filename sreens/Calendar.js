import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';


import Header from '../componets/Header';
import NavBar from '../componets/navBar';

export default function CalendarScreen({ navigation }) {
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    return (
        <>
            <Header />
            <Text>Calendar</Text>
            <NavBar
                Redirect={Redirect}
                home={false}
                routine={false}
                calendar={true}
                text={false}
                settings={false} />
        </>)
}