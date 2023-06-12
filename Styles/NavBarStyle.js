import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants';

const styleNavBar = StyleSheet.create({
    navBar: {
        width: '100%',
        height: 75,
        backgroundColor: '#1E1E1E',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    IconConteiner: {
        width: '20%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activetextNavBar: {
        color: '#fff',
        fontFamily: 'Lato_400Regular',
        fontSize: 14,
        marginTop: 5,
    },
    textNavBar: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Lato_400Regular',
        fontSize: 14,
        marginTop: 5,
    }
});

export default styleNavBar