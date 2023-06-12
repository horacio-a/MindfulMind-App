import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants';

const styleTextComp = StyleSheet.create({
    MainConteiner: {
        width: '85%',
        height: 1000,
        marginTop: 25,

    },
    title: {
        fontFamily: 'Lato_700Bold',
        fontSize: 30,

    },
    ConteinerTitle: {
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    addnewText: {
        width: '100%',
        height: 75,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textAddNewText: {
        marginLeft: 5,
        color: '#fff',
        fontFamily: 'Lato_700Bold',
        fontSize: 16,

    },
    ConteinerText: {
        width: '100%',
        height: 150,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        marginTop: 25,
    },
    titleText: {
        color: '#ffff',
        width: '100%',
        height: 15,
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'Lato_700Bold',
        fontSize: 18,

    }

});

export default styleTextComp