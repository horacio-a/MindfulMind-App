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
            <View style={styles.MainConteiner}>
            </View>
            <NavBar
                Redirect={Redirect}
                home={false}
                routine={false}
                calendar={true}
                text={false}
                settings={false} />
        </>)
}
const styles = StyleSheet.create({
    MainConteiner: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});