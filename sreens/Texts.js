import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../componets/Header';
import NavBar from '../componets/navBar';


export default function TextScreen({ navigation }) {
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    return (
        <>
            <Header />
            <Text>Texts</Text>
            <NavBar
                Redirect={Redirect}
                home={false}
                routine={false}
                calendar={false}
                text={true}
                settings={false} />
        </>)
}