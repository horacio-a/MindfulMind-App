
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';


export default function CalendarCard({ setCalendarCardVisibility, dataForCalendarCard }) {
    console.log(dataForCalendarCard)
    return (
        <View style={stylesHeader.Back}>
            <View style={stylesHeader.conteiner}></View>
            <View style={stylesHeader.card}>
                <Text></Text>
            </View>
            <TouchableWithoutFeedback onPress={() => { setCalendarCardVisibility(false) }} >
                <View style={stylesHeader.CloserWidthMax} ></View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const stylesHeader = StyleSheet.create({
    conteiner: {

    },
    Back: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    card: {
        position: 'absolute',
        zIndex: 10,
        width: '85%',
        height: '55%',
        borderRadius: 10,
        backgroundColor: '#1E1E1E',
    },
    CloserWidthMax: {
        width: '100%',
        height: '100%',

    },

    ConteinerTitle: {
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ConteinerButtom: {
        backgroundColor: '#1E1E1E',

        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row'
    },
    ButtomLeft: {
        width: '50%',
        height: '100%',
        borderRightColor: '#747272',
        borderRightWidth: 1,
        borderTopColor: '#747272',
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtomRight: {
        width: '50%',
        height: '100%',
        borderLeftColor: '#747272',
        borderLeftWidth: 1,
        borderTopColor: '#747272',
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextButtom: {
        color: '#fff',
        fontFamily: 'Lato_400Regular',
        fontSize: 16,
    }


});


