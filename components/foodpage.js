import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView} from 'react-native';
import QrImage from '../src/image/qrcode.png';
import firestore from '@react-native-firebase/firestore';

import { useScrollToTop } from '@react-navigation/native';

class Foodpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          recomendedFood : []
        }
        this.autoGetUser()
    }

    toQRcode = () => {
        
        this.props.navigation.navigate('QRCode')
    }

    autoGetUser = () => {
        firestore()
            .collection("foodList")
            .onSnapshot(docs => {
                let foodlist = []
                docs.forEach(doc => {
                    foodlist.push(doc)
                })
                this.setState({
                    recomendedFood : foodlist
                })
            })
    }

    render(){
        return(
            <ScrollView style={{height : '100%'}}>
            {console.log(this.state.recomendedFood)}
            <View style={styles.container}>
                <StatusBar backgroundColor='#F16A3C' barStyle='light-content' />
                <View style={styles.header}>
                    <Text style={styles.headerText}>Selamat datang{'\n'}di <Text style={styles.headerText1}>Quto</Text></Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.footerContentTop}>
                        <Text style={styles.footerTextTop}>*Scan Barcode Pada Meja</Text>
                        <TouchableOpacity onPress={()=> this.toQRcode()} style={styles.Qr}>
                            <Image
                                style={{height : 150, width : 150}}
                                source={QrImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{fontSize : 14, fontWeight : 'bold', paddingTop : 20}}>Rekomendasi Menu</Text>
                        <View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator ={false}>
                                {this.state.recomendedFood.map((food) =>
                                    <TouchableOpacity key={food.id} onPress={() => this.props.navigation.navigate('Detailfood', { idMakanan : food.id })}
                                        style={{ width: 150, marginTop: 20, marginRight: 20, borderWidth: 1, borderColor: '#999999', borderRadius: 10 }}>
                                        <View style={{
                                            height: 150, width: '100%', borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10
                                        }}>
                                            <Image
                                                source={{ uri: food._data.gambarMakanan }}
                                                style={{
                                                    flex: 1,
                                                    width: null,
                                                    height: null,
                                                    resizeMode: "cover",
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10
                                                }}
                                            />
                                        </View>
                                        <Text style={{ paddingTop: 5, paddingLeft: 5, marginBottom: 0, paddingBottom: 0, fontWeight: 'bold' }}>
                                            {food._data.namaMakanan}
                                    </Text>
                                        <Text style={{ paddingTop: 5, paddingLeft: 5, marginBottom: 0, paddingBottom: 0 }}>
                                            {food._data.hargaMakanan.toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}
                                    </Text>
                                    </TouchableOpacity>
                                )}                                                          
                           </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F16A3C',
        display: 'flex',
        height : '100%',
    },
    header: {
        padding: 20,
    },
    headerText: {
        justifyContent: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowRadius: 10,
        textShadowOffset: { width: 1, height: 5 },
    },
    headerText1: {
        fontSize: 60
    },
    footer: {
        flex : 1,
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    footerContentTop: {
        display: 'flex',
        alignItems: 'center',
    },
    footerTextTop: {
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Inter-Medium',
        color: '#999999',
        marginTop: 20,
        marginBottom: 11
    },
    Qr: {
        backgroundColor:'#EFEAD1',
        padding: 10,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    footerContentBot: {
        display: 'flex',
        paddingTop: 20
    },
    footerTextBot: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        lineHeight: 27,
        color: '#000',
        marginBottom: 10
    },
    rekMenu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },
    rekMenuIcon: {
        width: 150,
        height: 210,
        backgroundColor: '#343434',
        borderRadius: 15,
        alignItems: 'center',
        elevation: 4
    },
    textIconMenu: {
        fontFamily: 'Poppins-Bold',
        color: '#fff',
        fontSize: 15,
        lineHeight: 22,
    },
    textIconMenuRp: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        lineHeight: 20,
        color: '#fff'
    }
})


export default Foodpage