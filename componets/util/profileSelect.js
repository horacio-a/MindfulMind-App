
import { StyleSheet, Image, Text, TextInput, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useContext, useState } from 'react';

export default function ProfileSelect({ setprofilSelectcontent, ChangeProfilePicture, Redirect }) {
    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    if (!fontsLoaded) {
        return <></>;
    } else {

        return (
            <View style={style.Back}>
                <View style={style.conteiner}></View>
                <View style={style.card}>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center', fontFamily: 'Lato_700Bold', marginVertical: 20, fontSize: 20 }}>Seleciones su foto de perfil</Text>

                    <ScrollView >
                        <View style={style.dobleImgs}>
                            <TouchableOpacity onPress={() => { ChangeProfilePicture('mindfulmindLogo') }} style={style.ImgCon} >
                                <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/profilePictures/s-white.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { ChangeProfilePicture('mindfulmindLogoBlack') }} style={style.ImgCon} >
                                <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/profilePictures/s-black.png')}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={style.dobleImgs}>
                            <TouchableOpacity onPress={() => { ChangeProfilePicture('mindfulmindLogoBlack') }} style={style.ImgCon} >
                                <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/profilePictures/s-black.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { ChangeProfilePicture('mindfulmindLogo') }} style={style.ImgCon} >
                                <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/profilePictures/s-white.png')}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={style.dobleImgs}>
                            <TouchableOpacity onPress={() => { ChangeProfilePicture('mindfulmindLogo') }} style={style.ImgCon} >
                                <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/profilePictures/s-white.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { ChangeProfilePicture('mindfulmindLogoBlack') }} style={style.ImgCon} >
                                <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/profilePictures/s-black.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>


                </View>
                <TouchableWithoutFeedback onPress={() => { setprofilSelectcontent(false) }} >
                    <View style={style.CloserWidthMax} ></View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textAddNewText: {
        marginLeft: 5,
        color: '#fff',
        fontFamily: 'Lato_400Regular',
        fontSize: 13,

    },
    ButtomAdd: {
        backgroundColor: 'rgba(30, 30, 30, 1)',

        width: '85%',
        height: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginBottom: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddBar: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    singleTask: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        marginTop: 5
    },
    MainContent: {
        width: '85%',
        height: '70%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    titleCard: {
        fontFamily: 'Lato_400Regular',
        color: '#FFFFFF',
        fontSize: 22,
        marginLeft: 5,
        textTransform: 'capitalize'
    },
    LineaTitle: {
        width: '85%',
        height: 1,
        backgroundColor: '#fff',
    },
    titleCardConteiner: {
        width: '85%',
        height: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Back: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    card: {
        position: 'absolute',
        zIndex: 10,
        width: '85%',
        height: 500,
        borderRadius: 10,
        backgroundColor: 'rgba(30, 30, 30, 1)',

    },
    dobleImgs: {
        width: '100%',
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    CloserWidthMax: {
        width: '100%',
        height: '100%',
    },
    ImgCon: {
        width: 125,
        height: 125
    }

});


