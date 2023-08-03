import { StyleSheet, Switch, Text, View, FlatList, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../componets/Header';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useContext, useEffect, useRef, useState } from 'react';
import { Icon } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { ScrollView } from 'react-native';

import { TextSelect } from "../context/TextSelect";
import { TextDateGlobalState } from '../context/DataGlobalState';


export default function CreateText({ navigation }) {
    const { TextData, SetTextData } = useContext(TextDateGlobalState);
    const { SelectedText, setSelectedText } = useContext(TextSelect)
    const [Texto, setTexto] = useState('')

    const [Title, setTitle] = useState('')
    const [titleMsgErr, settitleMsgErr] = useState('');


    const Redirect = (url) => {
        navigation.navigate(url)
    }

    const [colorPickerVisi, setcolorPickerVisi] = useState(false)
    const [colorSelect, setColorSelect] = useState('#FFFFFF')



    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });


    const [btnEnable, setbtnEnable] = useState(true)

    const CreateTasks = async () => {
        setbtnEnable(false)

        let user = JSON.parse(await SecureStore.getItemAsync('userToken'))


        if (Title === '') {
            settitleMsgErr('Para crear un texto necesitas escribir un titulo')
            setTimeout(() => {
                settitleMsgErr('')
            }, 2500);
            return
        }
        if (Texto === '') {
            settitleMsgErr('Por favor ingrese su texto antes de guardar')
            setTimeout(() => {
                settitleMsgErr('')
            }, 2500);
            return
        }
        const date = new Date().toISOString()
        const data = {
            title: Title,
            text: Texto,
            user: user.user,
            colorHex: colorSelect,
            date: date
        }
        const respones = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/Text/createtext`, { data }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setSelectedText(respones.data.data)
        Redirect('EditText')
        SetTextData(respones.data.response)
        setbtnEnable(true)

    }

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                <Header back={true} Redirect={Redirect} />
                <View style={{ flex: 1, backgroundColor: '#000000' }} >
                    <View style={[style.Content]}>
                        <View style={style.conteinerTitle}>

                            <TextInput style={[style.input, { fontFamily: 'Lato_400Regular' }]}
                                maxFontSizeMultiplier={1.5}
                                placeholder="Titulo"
                                keyboardType="default"
                                placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                onChangeText={setTitle}
                            />
                            <TouchableOpacity style={[style.ButtonColorPicker, { backgroundColor: colorSelect }]}
                                onPress={() => {
                                    Keyboard.dismiss()
                                    setcolorPickerVisi(true)
                                }}>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'Lato_700Bold' }}>{titleMsgErr}</Text>
                        </View>

                    </View>
                    <View style={{ backgroundColor: '#1e1e1e', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: '95%',
                            height: "90%",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <TextInput
                                maxFontSizeMultiplier={1.5}
                                placeholder='¿Como estuvo tu dia?'
                                style={style.textarea}
                                multiline={true}
                                onChangeText={setTexto}
                                numberOfLines={1000}
                            />

                        </View>

                    </View>

                    <View style={{ width: '100%', height: '7.5%', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { Redirect('Home') }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Lato_700Bold' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { btnEnable ? CreateTasks() : '' }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text maxFontSizeMultiplier={1.5} style={{ color: `${btnEnable ? '#FFFFFF' : '#959696'}`, fontSize: 18, fontFamily: 'Lato_700Bold' }}>Guardar</Text>

                        </TouchableOpacity>

                    </View>
                </View>

                {
                    colorPickerVisi
                        ? <View style={style.MainNotificacion}>
                            <View style={style.NotificacionContent}>
                                <View style={style.NotificacionTitle}>
                                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 22, fontFamily: 'Lato_700Bold' }}>¿Como te sentiste hoy?</Text>
                                </View>
                                <ScrollView style={{ width: '100%' }}>
                                    <View style={style.ConteinerDoble}>
                                        <TouchableOpacity onPress={() => { setColorSelect('#FFC700'); setcolorPickerVisi(false) }} style={{ width: '45%', height: '90%', justifyContent: 'space-around', alignItems: 'center', }}>
                                            <View style={{ width: '80%', height: '80%', backgroundColor: '#FFC700', borderRadius: 15 }}></View>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 16, fontFamily: 'Lato_700Bold' }}>Alegre</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => { setColorSelect('#4447F4'); setcolorPickerVisi(false) }} style={{ width: '45%', height: '90%', justifyContent: 'space-around', alignItems: 'center', }}>
                                            <View style={{ width: '80%', height: '80%', backgroundColor: '#4447F4', borderRadius: 15 }}></View>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 16, fontFamily: 'Lato_700Bold' }}>Triste</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={style.ConteinerDoble}>
                                        <TouchableOpacity onPress={() => { setColorSelect('#A2FF86'); setcolorPickerVisi(false) }} style={{ width: '45%', height: '90%', justifyContent: 'space-around', alignItems: 'center', }}>
                                            <View style={{ width: '80%', height: '80%', backgroundColor: '#A2FF86', borderRadius: 15 }}></View>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 16, fontFamily: 'Lato_700Bold' }}>Esperanzado</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setColorSelect('#FFFFFF'); setcolorPickerVisi(false) }} style={{ width: '45%', height: '90%', justifyContent: 'space-around', alignItems: 'center', }}>
                                            <View style={{ width: '80%', height: '80%', backgroundColor: '#FFFFFF', borderRadius: 15 }}></View>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 16, fontFamily: 'Lato_700Bold' }}>Indiferente</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={style.ConteinerDoble}>

                                        <TouchableOpacity onPress={() => { setColorSelect('#CF010B'); setcolorPickerVisi(false) }} style={{ width: '45%', height: '90%', justifyContent: 'space-around', alignItems: 'center', }}>
                                            <View style={{ width: '80%', height: '80%', backgroundColor: '#CF010B', borderRadius: 15 }}></View>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 16, fontFamily: 'Lato_700Bold' }}>Enojado</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setColorSelect('#4D4D4D'); setcolorPickerVisi(false) }} style={{ width: '45%', height: '90%', justifyContent: 'space-around', alignItems: 'center', }}>
                                            <View style={{ width: '80%', height: '80%', backgroundColor: '#4D4D4D', borderRadius: 15 }}></View>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 16, fontFamily: 'Lato_700Bold' }}>Cansado</Text>
                                        </TouchableOpacity>
                                    </View>

                                </ScrollView>
                                <View style={{ width: "100%", height: 20 }}></View>


                            </View>
                            <TouchableWithoutFeedback onPress={() => { setcolorPickerVisi(false) }} >
                                <View style={style.CloserWidthMax} ></View>
                            </TouchableWithoutFeedback>
                        </View>
                        : <></>
                }

            </>
        )
    }
}

const style = StyleSheet.create({
    ConteinerDoble: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 150,
        marginBottom: 1
    },
    TouchableOpenNotification: {
        width: '50%'
    },
    BorderCheck: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        width: 20, height: 20,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 100,

    },
    NotificacionTitle: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    NotificacionUnit: {
        width: '90%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    NotificacionContent: {
        position: 'absolute',
        zIndex: 10,
        width: '90%',
        height: '55%',
        borderRadius: 10,
        backgroundColor: 'rgba(30, 30, 30, 1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CloserWidthMax: {
        width: '100%',
        height: '100%',
    },


    MainNotificacion: {
        zIndex: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
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
        width: '100%',
        height: '75%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Content: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        height: 'auto',
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    conteinerTitle: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: '100%',
        fontSize: 18,
        textAlign: 'left',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
        marginBottom: 10
    },
    ButtonColorPicker: {
        width: 30,
        height: 30,
        marginLeft: 25,
        borderRadius: 100
    },
    ConteinerColorPicker: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UnitColorPicker: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        marginLeft: 20,
        borderRadius: 100,
    },
    textarea: {
        width: '90%',
        padding: 25,
        backgroundColor: '#FFF',
        borderRadius: 15,
        textAlignVertical: 'top',
        height: "100%",
        fontSize: 14,
        color: '#333',
    },

})



