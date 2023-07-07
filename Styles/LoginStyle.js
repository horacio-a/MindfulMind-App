import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants';

const stylesLogin = StyleSheet.create({
    MainConteiner: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E',
        display: 'flex',
        alignItems: 'center',
    },
    ConteinerInputs: {
        width: '100%',
        height: 525,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 75,
        // backgroundColor: '#fff',
    },
    input: {
        width: '70%',
        height: '10%',
        fontSize: 18,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
        marginBottom: 10
    },
    conteinerInputPassword: {
        width: '100%',
        height: '10%',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputPassword: {
        width: '70%',
        height: '100%',
        fontSize: 18,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
        marginLeft: '15%'
    },
    ChangeVisibility: {
        width: '15%',
        height: '100%',
        color: '#F5F0F0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    ButtonSend: {
        marginTop: 20,
        width: '35%',
        height: '8.5%',
        borderWidth: 1.5,
        borderColor: '#F5F0F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextButtonSend: {
        color: '#F5F0F0',
        fontSize: 14,
    },
    TextForgotPassword: {
        color: 'rgba(245, 240, 240, 0.5)',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10
    },
    conteinerGeneralError: {
        width: '50%',
        height: 65,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextGeneralError: {
        textAlign: 'center',
        color: '#F5F0F0',

    },
    conteinerInputError: {
        width: '65%',
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputError: {
        textAlign: 'center',
        color: '#F5F0F0',

    },
    ConteinerScroll: {
        width: '100%',
        height: 225,
    }

});

export default stylesLogin