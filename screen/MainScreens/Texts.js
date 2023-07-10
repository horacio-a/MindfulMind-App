import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../componets/Header';
import NavBar from '../../componets/navBar';
import { useContext, useEffect } from 'react';
import { BackPageState } from '../../context/BackPageState';


export default function TextScreen({ navigation }) {


    const { BackPage, setBackPage } = useContext(BackPageState)


    useEffect(() => {
        setBackPage('TextScreen')
    }, [])


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
                calendar={false}
                text={true}
                settings={false} />
        </>
    )
}

const styles = StyleSheet.create({
    MainConteiner: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});