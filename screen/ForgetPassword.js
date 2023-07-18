import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
import Header from '../componets/Header';
import { useContext, useState, useEffect } from 'react';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
export default function ForgetPassword({ navigation }) {
    const [Email, setEmail] = useState('')
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Espera', '¿Estas seguro que quieres salir?', [
                { text: 'Si', onPress: () => BackHandler.exitApp() },

                {
                    text: 'No',
                    onPress: () => null,
                    style: 'cancel',
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                <Header back={true} Redirect={Redirect} />
                <View style={style.conteinerMain}>
                    <Text style={style.Title}>Ingrese su Email para recuperar tu cuenta</Text>
                    <View style={style.ConteinerInput}>
                        <TextInput style={[style.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="default"
                            placeholderTextColor="rgba(245, 240, 240, 0.75)"
                        />
                        <TouchableOpacity onPress={() => { console.log('hola') }} style={style.ButtonSend}>
                            <Text style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                Enviar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }

}

const style = StyleSheet.create({
    Title: {
        color: '#FFFFFF',
        width: '85%',
        textAlign: 'center',
        fontSize: 20n
    },
    conteinerMain: {
        flex: 1,
        backgroundColor: '#1e1e1e',

        alignItems: 'center',
        justifyContent: 'center'
    },
    ConteinerInput: {
        width: '85%',
        height: 135,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPassword: {
        width: '100%',
        height: '50%',
        fontSize: 18,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
    },
    ButtonSend: {
        marginTop: 20,
        width: '35%',
        height: '35%',
        borderWidth: 1.5,
        borderColor: '#F5F0F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextButtonSend: {
        color: '#F5F0F0',
        fontSize: 14,
    },
})