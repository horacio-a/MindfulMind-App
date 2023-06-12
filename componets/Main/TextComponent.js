import { Text, View, TouchableOpacity } from "react-native";
import styleTextComp from "../../Styles/TextComStyle";
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Loading from '../../sreens/Loading'
import { Icon } from '@rneui/themed';
import { useEffect, useState } from "react";
import axios from "axios";

import TextosConteiners from "../util/TextConteiner";
export default function TextComponent() {
    const [loading, setloading] = useState(true)

    const [textos, setTexto] = useState([])
    useEffect(() => {
        const getTexto = async () => {
            const response = await axios.get('http://31.220.17.121:3500/text/Horacio')
            setTexto(response.data)
            setloading(false)

        }
        getTexto()
    }, [])
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    if (!fontsLoaded) {
        return <Loading />;
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
                {
                    loading === false
                        ? (textos.map(item => <TextosConteiners
                            key={item.id}
                            data={item}
                        />))
                        : (<></>)
                }

            </View>
        )
    }

}