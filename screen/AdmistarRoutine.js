import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Keyboard, Vibration, StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import Header from "../componets/Header";
import { RoutineDateGlobalState } from "../context/DataGlobalState";
import { Icon } from '@rneui/themed';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { TextInput } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { GetAllDataFuntion } from "../context/GetAllData";
import NotificationTasks from "../componets/NotificationTasks";


export default function AdministraRoutine({ navigation }) {
    const [visibilityNotification, setvisibilityNotification] = useState(false)
    const [DataForDelete, setDataForDelete] = useState(false)
    const [TitleForNotification, setTitleForNotification] = useState('')

    const [sometingChange, setSometingChange] = useState(false)

    const backScript = () => {
        console.log(sometingChange)
        if (sometingChange) {
            setvisibilityNotification(true)
            setTitleForNotification('¿Seguro quieres salir?')
        } else {
            Redirect('Home')
        }
    }

    function renderItem(info) {
        const { item, onDragStart, onDragEnd, isActive } = info;
        const Drag = () => {
            Vibration.vibrate(0.15 * 1000)
        }

        const deleteButton = () => {
            setvisibilityNotification(true)
            setDataForDelete(item)
            setTitleForNotification('¿Seguro quieres eliminar esta tarea?')
        }




        return (
            <View key={item.id}
                style={{
                    width: '100%',
                    backgroundColor: isActive ? '#fff' : "#1e1e1e",
                    height: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: 10
                }}>


                <TouchableOpacity onPress={() => { deleteButton() }}>
                    <Icon
                        name='delete'
                        type="material-community"
                        color={isActive ? '#1e1e1e' : '#fff'}
                        size={18}
                    />

                </TouchableOpacity>

                <Text style={{ width: '80%', color: isActive ? '#1e1e1e' : '#fff', fontFamily: 'Lato_700Bold', textAlign: 'center' }}>{item.tasksName}</Text>

                <TouchableOpacity onPressIn={onDragStart} onPressOut={() => { onDragEnd, Drag() }}>
                    <Icon
                        name='drag-handle'
                        color={isActive ? '#1e1e1e' : '#fff'}
                    />
                </TouchableOpacity>

            </View>
        );
    }


    const { routineData, SetRoutineData } = useContext(RoutineDateGlobalState);
    let copyRoutineData = JSON.stringify(routineData)




    const [inputAdd, setinputAdd] = useState(false)
    const [InputTitle, onChangeInputTitle] = useState('')
    const refInput = React.useRef(null);

    const openInput = () => {
        setinputAdd(true)
        refInput.current.focus()
    }

    const closeInput = () => {
        setinputAdd(false)
        refInput.current.clear()
        Keyboard.dismiss()

    }

    async function CreateTasksRoutine() {
        let user = JSON.parse(await SecureStore.getItemAsync('userToken'))
        const response = await axios.post('http://31.220.17.121:3500/newtask/token', {
            "user": user.user,
            "title": InputTitle
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        const copy = routineData
        copy.data.push(response.data)
        SetRoutineData(copy)
        closeInput()
    }


    async function onReordered(fromIndex, toIndex) {
        setSometingChange(true)
        const finalIndex = fromIndex < toIndex ? toIndex : toIndex;
        const copy = routineData;
        const removed = copy.data.splice(fromIndex, 1);

        copy.data.splice(finalIndex, 0, removed[0]);
        SetRoutineData(copy);
    }

    const Redirect = (url) => {
        navigation.navigate(url)
    }


    const saveOrder = async () => {
        let user = JSON.parse(await SecureStore.getItemAsync('userToken'))

        let obj = { info: { user: user.user }, data: [] }
        for (let i = 0; i < routineData.data.length; i++) {
            const element = routineData.data[i];

            obj.data.push({ id: element.id, NewOrden: (i + 1) })
        }

        const response = await axios.post('http://31.220.17.121:3500/ReOrder', { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        console.log(response.data)
        SetRoutineData(response.data)
        Redirect('Home')
    }


    const CancelOrden = () => {
        console.log(JSON.parse(copyRoutineData))
        SetRoutineData(JSON.parse(copyRoutineData))
        setvisibilityNotification(false)
        // Redirect('Home')

    }


    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });



    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                <Header back={true} Redirect={Redirect} script={backScript} />
                <View style={{ flex: 1, backgroundColor: '#000000' }}>
                    <View style={{ height: 650, backgroundColor: '#1E1E1E', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <View style={inputAdd ? style.conteinerInput : style.conteinerButtonAddDesactive}>
                            <TextInput placeholder="Titulo"
                                keyboardType="default"
                                placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                ref={refInput}
                                onChangeText={onChangeInputTitle}
                                style={{ color: '#FFFFFF', width: '70%', height: '95%', borderBottomWidth: 2, borderBottomColor: '#FFFFFF', textAlign: 'center' }}
                            />
                            <TouchableOpacity onPress={() => { CreateTasksRoutine() }} style={{ marginLeft: 5, width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                <Icon
                                    name="check"
                                    color='#FFFFFF'
                                    size={18}
                                />

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { closeInput() }} style={{ marginLeft: 5, width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                <Icon
                                    name="close"
                                    color='#FFFFFF'
                                    size={18}
                                />
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={() => { openInput() }} style={!inputAdd ? style.conteinerButtonAdd : style.conteinerButtonAddDesactive}>
                            <Icon
                                name='pluscircleo'
                                type="antdesign"
                                color='#1E1E1E'
                                size={16}
                            />
                            <Text style={style.textButton}>Agregar una tarea</Text>
                        </TouchableOpacity>
                        <View style={{ height: '75%', width: '85%', marginBottom: 15, marginTop: 15 }}>

                            <DragList
                                data={routineData.data}
                                keyExtractor={(str) => { return str.id }}
                                onReordered={onReordered}
                                renderItem={renderItem}
                            />
                        </View>

                    </View>

                    <View style={{ width: '100%', height: '10%', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { CancelOrden() }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Lato_700Bold' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { saveOrder() }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Lato_700Bold' }}>Guardar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {
                    visibilityNotification

                        ? <NotificationTasks
                            setvisibilityNotification={setvisibilityNotification}
                            DataForDelete={DataForDelete}
                            Title={TitleForNotification}
                            CancelOrden={CancelOrden}

                        />
                        : <></>
                }
            </>

        );
    }
}
const style = StyleSheet.create({
    conteinerButtonAddDesactive: {
        display: 'none'
    },
    conteinerButtonAdd: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    textButton: {
        marginLeft: 5,
        color: '#1E1E1E',
        fontFamily: 'Lato_700Bold',
        fontSize: 14,
    },
    conteinerInput: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
})