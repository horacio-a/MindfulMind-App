import { useState } from 'react';
import { StyleSheet, Switch, Button, Text, View, FlatList, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, RefreshControl } from 'react-native';



export default function SelectComponet({ width, dataList, Title, zIndex }) {
    const [open, setOpen] = useState(false)

    return (
        <TouchableOpacity onPress={() => { open ? setOpen(false) : setOpen(true) }}
            style={[style.conteinerMain, { width: width, zIndex: zIndex }]}>
            <View style={{
                width: '100%', height: '100%', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} >
                <Text style={{ color: '#fff' }}>{Title}</Text>
            </View>
            {
                open
                    ? <View style={[style.List]}>
                        {
                            dataList.map(data => (
                                <TouchableOpacity onPress={() => { setOpen(false) }} style={[style.unitList, { zIndex: zIndex }]} key={data}>
                                    <Text>{data}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    : <></>
            }
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    conteinerMain: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // backgroundColor: '#fff'
    },
    List: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        top: '100%',
    },
    unitList: {
        position: 'absolute',
        width: '100%',
        height: '75%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})