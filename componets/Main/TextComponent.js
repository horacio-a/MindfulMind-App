import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styleTextComp from "../../Styles/TextComStyle";
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Loading from '../../screen/Loading'
import { Icon } from '@rneui/themed';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TextDateGlobalState } from "../../context/DataGlobalState";
import TextosConteiners from "../util/TextConteiner";
import LoadingTextComp from "./LoadingTextComp";
import ContentLoader from "react-native-easy-content-loader";


export default function TextComponent({ Redirect }) {
    const [loading, setloading] = useState(true)
    const { TextData, SetTextData } = useContext(TextDateGlobalState);
    useEffect(() => {
        setloading(false)
    }, [])

    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    if (!fontsLoaded) {
        return (
            <LoadingTextComp />
        )
    } else {
        return (
            <>
                <View style={styleTextComp.MainConteiner}>
                    <View style={styleTextComp.ConteinerTitle}>
                        <Text maxFontSizeMultiplier={1.5} style={[styleTextComp.title]}>Tus textos</Text>
                    </View>
                    <TouchableOpacity onPress={() => { Redirect('CreateText') }} style={styleTextComp.addnewText}>
                        <Icon
                            name='pluscircleo'
                            type="antdesign"
                            color='#fff'
                        />
                        <Text maxFontSizeMultiplier={1.75} style={styleTextComp.textAddNewText}>Agregar un texto</Text>
                    </TouchableOpacity>

                    {
                        TextData[0] !== undefined
                            ? (<View style={{ height: 345, marginTop: 20 }}>
                                <ScrollView
                                    nestedScrollEnabled={true}>
                                    {

                                        loading === false
                                            ? (
                                                TextData.map(item => <TextosConteiners
                                                    key={item.id}
                                                    data={item}
                                                    Redirect={Redirect}
                                                />)
                                            )
                                            : (<></>)
                                    }

                                </ScrollView>
                            </View>)
                            : <View style={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text maxFontSizeMultiplier={1.75} style={{ color: '#1e1e1e', fontSize: 24, fontFamily: 'Lato_700Bold', textAlign: 'center', width: '85%' }}>Todavia no tienes textos</Text>
                            </View>
                    }



                </View>

            </>

        )
    }

}