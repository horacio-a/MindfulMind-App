import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Alert, Animated, Image } from 'react-native';
import { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Icon } from '@rneui/themed';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Constants from 'expo-constants';
import { SesionGlobalState } from '../context/SesionGlobalState';


export default function TutorialForNewUser({ navigation }) {
    const { session, setsession } = useContext(SesionGlobalState);
    const [animGo, setAnimGo] = useState(false)
    useEffect(() => {
        const backAction = () => {

            () => null
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const [RoutineExample, setRoutineExample] = useState({
        primera: true,
        segunda: false,
        tercera: false,

    })

    const [etapa, setetapa] = useState({
        primera: true,
        segunda: false,
        tercera: false,
        cuarta: false,
        quinta: false,
        sexta: false
    })
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim1 = useRef(new Animated.Value(0)).current;



    useEffect(() => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        if (etapa.primera) {
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
                Animated.timing(fadeAnim1, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            }, 3500);

            setTimeout(() => {
                setetapa({
                    primera: false,
                    segunda: true,
                    tercera: false,
                    cuarta: false,
                    quinta: false,
                    sexta: false
                })
            }, 4500);
        }


    }, [etapa])


    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;

    const sendAnimation3 = () => {
        Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim3, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
        }).start();
    }

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                {
                    etapa.primera
                        ? <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                            <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim, fontSize: 26, textAlign: 'center' }}>Bienvenido a Mindfulmind</Animated.Text>
                            <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim1, fontSize: 20, marginTop: 15, textAlign: 'center' }}>Productividad conciente</Animated.Text>
                        </View>
                        : (
                            etapa.segunda
                                ? <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                                    <View style={{ height: '10%', width: '100%' }}></View>

                                    <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }}>
                                        <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim, fontSize: 26, height: '5%', textAlign: 'center' }}>¿Necesitas un tutorial?</Animated.Text>
                                        <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim1, fontSize: 16, marginTop: 15, textAlign: 'center' }}>Podras acceder mas adelante</Animated.Text>
                                    </View>
                                    <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <TouchableOpacity onPress={() => { setsession(true) }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Omitir</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setetapa({
                                                primera: false,
                                                segunda: false,
                                                tercera: true,
                                                cuarta: false,
                                                quinta: false,
                                                sexta: false
                                            })
                                            sendAnimation3()
                                        }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Continuar</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View >
                                : (
                                    etapa.tercera
                                        ? <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                                            <View style={{ height: '10%', width: '100%' }}></View>

                                            <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }}>
                                                <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 26, height: '10%', textAlign: 'center' }}>¿Cual es el objetivo de Mindfulmind?</Animated.Text>
                                                <View style={{ width: '75%', height: 'auto' }}>
                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#FFF', fontFamily: 'Lato_400Regular', opacity: fadeAnim3, fontSize: 18, textAlign: 'center' }}>Con mindfulmind queremos que tu vida sea mas facil, y para lograr eso queremos aumentar tu productividad. Y como vamos a lograr eso... </Animated.Text>
                                                </View>

                                            </View>
                                            <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity onPress={() => {
                                                    setetapa({
                                                        primera: false,
                                                        segunda: true,
                                                        tercera: false,
                                                        cuarta: false,
                                                        quinta: false,
                                                        sexta: false
                                                    })
                                                }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Atras</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    setetapa({
                                                        primera: false,
                                                        segunda: false,
                                                        tercera: false,
                                                        cuarta: true,
                                                        quinta: false,
                                                        sexta: false
                                                    })
                                                }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Continuar</Text>
                                                </TouchableOpacity>

                                            </View>

                                        </View >
                                        : (
                                            etapa.cuarta
                                                ? <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                                                    <View style={{ height: '10%', width: '100%', justifyContent: 'flex-end' }}>
                                                        <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 26, height: '50%', textAlign: 'center' }}>Para lograr eso vamos a...</Animated.Text>

                                                    </View>
                                                    {
                                                        RoutineExample.primera
                                                            ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Vamos a implementar un rutina</Animated.Text>
                                                                    <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto1.jpg')} />
                                                                </View>
                                                            </View>
                                                            : (
                                                                RoutineExample.segunda
                                                                    ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Vamos a implementar un rutina</Animated.Text>
                                                                            <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto2.jpg')} />
                                                                        </View>
                                                                    </View>
                                                                    : (
                                                                        RoutineExample.tercera
                                                                            ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Vamos a implementar un rutina</Animated.Text>
                                                                                    <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto-3.jpg')} />
                                                                                </View>
                                                                            </View>
                                                                            : <></>)
                                                            )}

                                                    <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                        <TouchableOpacity onPress={() => {

                                                            if (RoutineExample.primera) {
                                                                setetapa({
                                                                    primera: false,
                                                                    segunda: false,
                                                                    tercera: true,
                                                                    cuarta: false,
                                                                    quinta: false,
                                                                    sexta: false
                                                                })
                                                            }
                                                            if (RoutineExample.segunda) {
                                                                setRoutineExample({
                                                                    primera: true,
                                                                    segunda: false,
                                                                    tercera: false,

                                                                })
                                                            }
                                                            if (RoutineExample.tercera) {
                                                                setRoutineExample({
                                                                    primera: false,
                                                                    segunda: true,
                                                                    tercera: false,

                                                                })
                                                            }
                                                        }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Atras</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity onPress={() => {
                                                            if (RoutineExample.primera) {
                                                                setRoutineExample({
                                                                    primera: false,
                                                                    segunda: true,
                                                                    tercera: false,

                                                                })
                                                            }
                                                            if (RoutineExample.segunda) {
                                                                setRoutineExample({
                                                                    primera: false,
                                                                    segunda: false,
                                                                    tercera: true,

                                                                })
                                                            }
                                                            if (RoutineExample.tercera) {
                                                                setRoutineExample({
                                                                    primera: true,
                                                                    segunda: false,
                                                                    tercera: false,

                                                                })
                                                                setetapa({
                                                                    primera: false,
                                                                    segunda: false,
                                                                    tercera: false,
                                                                    cuarta: false,
                                                                    quinta: true,
                                                                    sexta: false
                                                                })
                                                            }
                                                        }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Continuar</Text>
                                                        </TouchableOpacity>

                                                    </View>

                                                </View >
                                                : (
                                                    etapa.quinta
                                                        ? <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                                                            <View style={{ height: '10%', width: '100%', justifyContent: 'flex-end' }}>
                                                                <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 26, height: '50%', textAlign: 'center' }}>Pero para ideas unicos...</Animated.Text>

                                                            </View>
                                                            {
                                                                RoutineExample.primera
                                                                    ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Podes ir a tu calendario</Animated.Text>
                                                                            <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto1.jpg')} />
                                                                        </View>
                                                                    </View>
                                                                    : (
                                                                        RoutineExample.segunda
                                                                            ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Crear y personalizar tu evento</Animated.Text>
                                                                                    <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto2.jpg')} />
                                                                                </View>
                                                                            </View>
                                                                            : (
                                                                                RoutineExample.tercera
                                                                                    ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                                            <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Y nosotros te hacemos acordar</Animated.Text>
                                                                                            <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto-3.jpg')} />
                                                                                        </View>
                                                                                    </View>
                                                                                    : <></>)
                                                                    )}

                                                            <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                <TouchableOpacity onPress={() => {

                                                                    if (RoutineExample.primera) {
                                                                        setetapa({
                                                                            primera: false,
                                                                            segunda: false,
                                                                            tercera: true,
                                                                            cuarta: false,
                                                                            quinta: false,
                                                                            sexta: false
                                                                        })
                                                                    }
                                                                    if (RoutineExample.segunda) {
                                                                        setRoutineExample({
                                                                            primera: true,
                                                                            segunda: false,
                                                                            tercera: false,

                                                                        })
                                                                    }
                                                                    if (RoutineExample.tercera) {
                                                                        setRoutineExample({
                                                                            primera: false,
                                                                            segunda: true,
                                                                            tercera: false,

                                                                        })
                                                                    }
                                                                }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Atras</Text>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity onPress={() => {
                                                                    if (RoutineExample.primera) {
                                                                        setRoutineExample({
                                                                            primera: false,
                                                                            segunda: true,
                                                                            tercera: false,

                                                                        })
                                                                    }
                                                                    if (RoutineExample.segunda) {
                                                                        setRoutineExample({
                                                                            primera: false,
                                                                            segunda: false,
                                                                            tercera: true,

                                                                        })
                                                                    }
                                                                    if (RoutineExample.tercera) {
                                                                        setRoutineExample({
                                                                            primera: true,
                                                                            segunda: false,
                                                                            tercera: false,

                                                                        })
                                                                        setetapa({
                                                                            primera: false,
                                                                            segunda: false,
                                                                            tercera: false,
                                                                            cuarta: false,
                                                                            quinta: false,
                                                                            sexta: true
                                                                        })
                                                                    }
                                                                }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Continuar</Text>
                                                                </TouchableOpacity>

                                                            </View>

                                                        </View >
                                                        : (
                                                            etapa.sexta
                                                                ? <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                                                                    <View style={{ height: '10%', width: '100%', justifyContent: 'flex-end' }}>
                                                                        <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 26, height: '50%', textAlign: 'center' }}>Pero tambien vos sos importante</Animated.Text>

                                                                    </View>
                                                                    {
                                                                        RoutineExample.primera
                                                                            ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>Contamos con un apartado de texto</Animated.Text>
                                                                                    <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto1.jpg')} />
                                                                                </View>
                                                                            </View>
                                                                            : (
                                                                                RoutineExample.segunda
                                                                                    ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                                        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                                            <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>donde podes hacer un resumen de tu dia</Animated.Text>
                                                                                            <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto2.jpg')} />
                                                                                        </View>
                                                                                    </View>
                                                                                    : (
                                                                                        RoutineExample.tercera
                                                                                            ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
                                                                                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#959696', fontFamily: 'Lato_400Regular', opacity: fadeAnim2, fontSize: 20, height: 'auto', textAlign: 'center', marginBottom: 25 }}>y asi vas a poder ver como estuvieron tus meses</Animated.Text>
                                                                                                    <Image style={{ height: '70%', width: '55%' }} source={require('../assets/tutorial/routinePhoto-3.jpg')} />
                                                                                                </View>
                                                                                            </View>
                                                                                            : <></>)
                                                                            )}

                                                                    <View style={{ height: '10%', width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                                        <TouchableOpacity onPress={() => {

                                                                            if (RoutineExample.primera) {
                                                                                setetapa({
                                                                                    primera: false,
                                                                                    segunda: false,
                                                                                    tercera: true,
                                                                                    cuarta: false,
                                                                                    quinta: false,
                                                                                    sexta: false
                                                                                })
                                                                            }
                                                                            if (RoutineExample.segunda) {
                                                                                setRoutineExample({
                                                                                    primera: true,
                                                                                    segunda: false,
                                                                                    tercera: false,

                                                                                })
                                                                            }
                                                                            if (RoutineExample.tercera) {
                                                                                setRoutineExample({
                                                                                    primera: false,
                                                                                    segunda: true,
                                                                                    tercera: false,

                                                                                })
                                                                            }
                                                                        }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Atras</Text>
                                                                        </TouchableOpacity>

                                                                        <TouchableOpacity onPress={() => {
                                                                            if (RoutineExample.primera) {
                                                                                setRoutineExample({
                                                                                    primera: false,
                                                                                    segunda: true,
                                                                                    tercera: false,

                                                                                })
                                                                            }
                                                                            if (RoutineExample.segunda) {
                                                                                setRoutineExample({
                                                                                    primera: false,
                                                                                    segunda: false,
                                                                                    tercera: true,

                                                                                })
                                                                            }
                                                                            if (RoutineExample.tercera) {
                                                                                setRoutineExample({
                                                                                    primera: true,
                                                                                    segunda: false,
                                                                                    tercera: false,

                                                                                })
                                                                                setetapa({
                                                                                    primera: false,
                                                                                    segunda: false,
                                                                                    tercera: false,
                                                                                    cuarta: false,
                                                                                    quinta: false,
                                                                                    sexta: false
                                                                                })
                                                                            }
                                                                        }} style={{ width: '35%', height: '50%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Continuar</Text>
                                                                        </TouchableOpacity>

                                                                    </View>

                                                                </View >
                                                                : <View style={{ backgroundColor: '#1e1e1e', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight, }}>
                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim, fontSize: 26 }}>Ya estas listo</Animated.Text>
                                                                    <Animated.Text maxFontSizeMultiplier={1.5} style={{ textAlign: 'center', color: '#fff', fontFamily: 'Lato_400Regular', opacity: fadeAnim1, fontSize: 20, marginTop: 15 }}>Ya puedes usar a pleno mindfulmind.</Animated.Text>
                                                                    <TouchableOpacity onPress={() => { setsession(true) }} style={{ width: '35%', height: '5%', borderWidth: 1, borderColor: '#fff', borderRadius: 2, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                                                                        <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold' }}>Finalizar</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                        )
                                                )
                                        )
                                )
                        )
                }
            </>

        )
    }

}