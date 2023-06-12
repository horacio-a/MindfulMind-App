import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants';

const stylesHeader = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#1E1E1E',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    conteinerMenuHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '100%',
    },
    conteinerImgHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: '100%',
        marginRight: '15%'
    },
    imgHeader: {
        height: 35,
        width: 35
    }
});

export default stylesHeader