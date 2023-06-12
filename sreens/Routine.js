import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

import Header from '../componets/Header';
import NavBar from '../componets/navBar';
export default function RoutineScreen({ navigation }) {
    const Redirect = (url) => {
        navigation.navigate(url)
    }

    return (
        <>
            <Header />
            <Text>Routine</Text>
            <NavBar
                Redirect={Redirect}
                home={false}
                routine={true}
                calendar={false}
                text={false}
                settings={false} />
        </>

    )
}