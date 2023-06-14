import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import stylesMain from '../../Styles/MainStyle';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../sreens/Loading'
import { RoutineDateGlobalState } from '../../context/RoutineDataGlobalState';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';



export default function Routine({ Redirect, SendAlter }) {
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const [loading, setloading] = useState(false)


    const { routineData, SetRoutineData } = useContext(RoutineDateGlobalState);



    if (!fontsLoaded) {
        return <Loading />;
    } else {
        return (
            <View style={stylesMain.MainConteiner}>
                <View style={stylesMain.ConteinerTitle}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesMain.Title]}>Tu Rutina</Text>
                </View>
                <View style={stylesMain.ConteinerSmallBlock}>
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
                                                    <Text maxFontSizeMultiplier={1.25} style={stylesMain.TextTask}>
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
                            <View style={stylesMain.InnerBlock}>
                                <Text style={stylesMain.TextPorcentaje}>{routineData.porcentaje}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={stylesMain.AddBlock}>

                </TouchableOpacity>
            </View>
        )
    }

}