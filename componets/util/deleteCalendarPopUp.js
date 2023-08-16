import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default function DeleteCalendarPopUp({ setdeletePopUp, deleteCalendarTasks }) {
    return (
        <View style={stylesHeader.Back}>
            <View style={stylesHeader.Notification}>
                <View style={stylesHeader.ConteinerTitle}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'Lato_700Bold',
                        fontSize: 18,
                        marginBottom: 5
                    }}>Espera</Text>
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'Lato_400Regular',
                        fontSize: 16,
                        paddingLeft: 5,
                        paddingRight: 5,
                        textAlign: 'center'
                    }}>¿Seguro quieres eliminar este recordatorio?</Text>
                </View>
                <View style={stylesHeader.ConteinerButtom}>
                    <TouchableOpacity onPress={() => { setdeletePopUp(false) }} style={stylesHeader.ButtomLeft}>
                        <Text style={stylesHeader.TextButtom}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { deleteCalendarTasks() }} style={stylesHeader.ButtomRight}>
                        <Text style={stylesHeader.TextButtom}>Si</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

}


const stylesHeader = StyleSheet.create({
    Back: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Notification: {
        width: '65%',
        height: '20%',
        borderRadius: 10,
        backgroundColor: '#1E1E1E',

    },
    ConteinerTitle: {
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ConteinerButtom: {
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