import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import stylesMain from '../../Styles/MainStyle';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../screen/Loading'
import { RoutineDateGlobalState } from '../../context/DataGlobalState';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import LoadingRoutine from './LoadingRoutine';
import ContentLoader from "react-native-easy-content-loader";
import * as SecureStore from 'expo-secure-store';

export default function Routine({ Redirect, SendAlter }) {
    const [loading, setloading] = useState(false)
    const { routineData, SetRoutineData } = useContext(RoutineDateGlobalState);

    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });


    const [spinValue] = useState(new Animated.Value(0));

    useEffect(() => {
        const spin = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }
            )
        ).start();
    }, []);


    const EditRoutine = async () => {
        await SecureStore.setItemAsync('routineDataCopy', JSON.stringify(routineData))
        Redirect('AdminRoutine')
    }


    if (!fontsLoaded) {
        return (
            <LoadingRoutine />

        )
    } else {
        return (
            <View style={stylesMain.MainConteiner}>
                <View style={stylesMain.ConteinerTitle}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesMain.Title]}>Tu Rutina</Text>
                </View>
                {
                    routineData.data[0] !== undefined
                        ? <View style={stylesMain.ConteinerSmallBlock}>
                            <View style={stylesMain.SmallBlock}>
                                <View style={stylesMain.BlockTitle}>
                                    <Text allowFontScaling={false} style={[stylesMain.TitleBlock]}>Lista</Text>
                                </View>

                                <ScrollView nestedScrollEnabled={true}>
                                    {
                                        loading == false
                                            ? (
                                                routineData.data.map(task => (
                                                    <TouchableOpacity onPress={() => { SendAlter(task) }} style={stylesMain.conteinerTask} key={task.id}>
                                                        <View style={stylesMain.conteinerImgTaks}>
                                                            {
                                                                task.completed === 1
                                                                    ? <Image style={stylesMain.imgList} source={require('../../img/CompleteTask.png')} />
                                                                    : <Image style={stylesMain.imgList} source={require('../../img/EmptyTask.png')} />
                                                            }
                                                        </View>
                                                        <View style={stylesMain.conteinerTextTaks}>
                                                            <Text maxFontSizeMultiplier={1.25} numberOfLines={1} style={stylesMain.TextTask}>
                                                                {task.tasksName}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )))
                                            : (<></>)
                                    }
                                </ScrollView>
                            </View>

                            <View style={stylesMain.SmallBlock}>
                                <View style={stylesMain.BlockTitle}>
                                    <Text allowFontScaling={false} style={[stylesMain.TitleBlock, { fontSize: 14 }]}>El porcentaje del dia</Text>
                                </View>
                                <View style={stylesMain.BlockTextPorcentaje}>
                                    <View style={[stylesMain.InnerBlock, {
                                        backgroundColor: `${parseInt(routineData.porcentaje) < 35 ? '#fff' : (parseInt(routineData.porcentaje) < 85 ? '#FFA500' : '#01A601')}`
                                    }]}>
                                        <Text maxFontSizeMultiplier={1} style={[stylesMain.TextPorcentaje, { color: `${parseInt(routineData.porcentaje) < 35 ? '#1E1E1E' : '#fff'}` }]}>{routineData.porcentaje === 'NaN%' ? '0%' : `${routineData.porcentaje}`}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        : <View style={stylesMain.ConteinerTitleForEmpty}>
                            <Text style={{ color: '#1e1e1e', textAlign: 'center', fontSize: 20, width: '75%', fontFamily: 'Lato_700Bold' }}>Cuando inicies tu rutina</Text>
                            <Text style={{ color: '#1e1e1e', textAlign: 'center', fontSize: 20, width: '75%', fontFamily: 'Lato_700Bold' }}>podrás verla aquí</Text>



                        </View>
                }
                <TouchableOpacity onPress={() => { EditRoutine() }} style={stylesMain.AddBlock}>
                    <Text maxFontSizeMultiplier={1.5} style={styles.Text}>{routineData.data[0] !== undefined ? 'Editar tu rutina' : 'Iniciar tu rutina'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Lato_700Bold'
    }
});



