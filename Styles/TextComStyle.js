import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants';

const styleTextComp = StyleSheet.create({
    MainConteiner: {
        width: '85%',
        height: 500,
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
        height: 60,
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
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    titleText: {
        color: '#ffff',
        width: '100%',
        height: 15,
        textAlign: 'center',
        marginTop: 15,
        fontFamily: 'Lato_700Bold',
        fontSize: 18,

    },
    LoadingTitle: {
        position: 'relative',
        overflow: 'hidden',
        width: '50%',
        height: '50%',
        backgroundColor: '#a0a0a0',
        borderRadius: 5,
    },
    LoadingaddnewText: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 75,
        backgroundColor: '#a0a0a0',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    LoadingConteinerText: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 150,
        backgroundColor: '#a0a0a0',
        borderRadius: 10,
        marginTop: 25,
    },


    Text: {
        width: '80%',
        height: 100,
        color: '#FFFFFF',

    }
});

export default styleTextComp