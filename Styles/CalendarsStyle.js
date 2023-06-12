import { color } from "@rneui/base";
import { StyleSheet } from "react-native-web";

const stylesCalendar = StyleSheet.create({
    conteinerMain: {
        width: '85%',
        height: 350,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ConteinerTitle: {
        width: '85%',
        height: 52.5,
        marginBottom: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleMain: {
        fontSize: 26,
        fontFamily: 'Lato_700Bold'
    },
    BlockMouth: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleMonth: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22,
        fontFamily: 'Lato_700Bold'
    },
    BlockDays: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    TitleDays: {
        color: '#fff',
        fontSize: 10,
        fontFamily: 'Lato_400Regular'

    },
    BlockTitleDays: {
        width: '14%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    NumberCalendar: {
        width: '100%',
        height: '70%',
    },
    RowCalendar: {
        width: '100%',
        height: '16.7%',
        border: '1px solid #1E1E1E',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    ConteinerUnit: {
        width: '14%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',

    },
    ConteinerUnitToday: {
        width: '14%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#fff',

    },
    TextNumber: {
        color: 'rgba(245, 240, 240, 1.0)',
        fontSize: 12,
        fontFamily: 'Lato_400Regular'

    },

    opacityLow: {
        color: 'rgba(245, 240, 240, 0.5)',
        fontSize: 12,
        fontFamily: 'Lato_400Regular'

    },
    TextNumberToday: {
        color: '#1E1E1E',
        fontSize: 12,
        fontFamily: 'Lato_400Regular'
    },
    circulo: {
        marginTop: 2.5,
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    circuloOpacityLow: {
        marginTop: 2.5,
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(245, 240, 240, 0.5)',
    },
    circuloToday: {
        marginTop: 2.5,
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#1E1E1E',
    }

});

export default stylesCalendar