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


export default function TextComponent() {
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
            <View style={styleTextComp.MainConteiner}>
                <View style={styleTextComp.ConteinerTitle}>
                    <Text style={[styleTextComp.title]}>Tus textos</Text>
                </View>
                <TouchableOpacity style={styleTextComp.addnewText}>
                    <Icon
                        name='pluscircleo'
                        type="antdesign"
                        color='#fff'
                    />
                    <Text style={styleTextComp.textAddNewText}>Agregar un texto</Text>
                </TouchableOpacity>
                <ScrollView>

                    {
                        loading === false
                            ? (TextData.map(item => <TextosConteiners
                                key={item.id}
                                data={item}
                            />))
                            : (<></>)
                    }
                </ScrollView>


            </View>
        )
    }

}