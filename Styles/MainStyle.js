import { StyleSheet } from "react-native-web";
import Constants from 'expo-constants';

const stylesMain = StyleSheet.create({
    MainConteiner: {
        width: '85%',
        height: 350,
        marginTop: 25,

    },
    ConteinerTitle: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Title: {
        fontSize: 26,
        fontFamily: 'Lato_700Bold'

    },
    SmallBlock: {
        width: '45%',
        height: '100%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
    },
    ConteinerSmallBlock: {
        width: '100%',
        height: '45%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
    },
    BlockTitle: {
        width: '100%',
        height: '25%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    conteinerTask: {
        width: '100%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgList: {
        height: 10,
        width: 10
    },
    TitleBlock: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lato_700Bold'
    },

    TextPorcentaje: {
        fontSize: 30
    },
    BlockTextPorcentaje: {
        width: '100%',
        height: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    InnerBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        backgroundColor: '#FFA500',
        borderRadius: 10,
    },
    conteinerImgTaks: {
        width: '20%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    conteinerTextTaks: {
        width: '80%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextTask: {
        width: '100%',
        height: 'auto',
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        height: 20
    },
    AddBlock: {
        width: '100%',
        height: 60,
        backgroundColor: '#1E1E1E',
        marginTop: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoadingTitle: {
        position: 'relative',
        overflow: 'hidden',
        width: '50%',
        height: '50%',
        backgroundColor: '#a0a0a0',
        borderRadius: 5,
    },
    LoadingSmallBlock: {
        position: 'relative',
        overflow: 'hidden',

        width: '45%',
        height: '100%',
        backgroundColor: '#a0a0a0',
        borderRadius: 10,
    },
    LoadingAddBlock: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 60,
        backgroundColor: '#a0a0a0',
        marginTop: 10,
        borderRadius: 10,
    },
});

export default stylesMain