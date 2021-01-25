import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Modal, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { CropView } from 'react-native-image-crop-tools';
import firestore from '@react-native-firebase/firestore';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import home from '../src/image/home.png'

class Orderpageadmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
           pesananList : [],
           modal : false,
           modalData : [],
           modalNama : '',
           modalTempat : '',
           modalID : ''
        }
        this.autoGetPesanan()
    }

    autoGetPesanan = () => {
        firestore()
            .collection("pesanan")
            .where('pesananStatus', '==', 1)
            .get()
            .then(querySnapshot => {
                let anypesanan = []
                querySnapshot.forEach(doc => {
                    anypesanan.push(doc)
                })
                this.setState({
                    pesananList: anypesanan
                })
            });
            // .onSnapshot(docs => {
            //     let anypesanan= []
            //     docs.forEach(doc => {
            //         anypesanan.push(doc.data())
            //     })
            //     this.setState({
            //         pesananList : anypesanan
            //     })
            // })
    }

    sumOrderan = (data) => {
        let max = data.pesananPelanggan.length
        var totalitem = 0
        for (var i = 0; i < max; i++) {
            totalitem += (data.pesananPelanggan[i].jumlahPesanan)
        }
        return (totalitem)
    }

    sumPrice = (data) => {
        let max = data.pesananPelanggan.length
        var totalprice = 0
        for (var i = 0; i < max; i++) {
            totalprice += (data.pesananPelanggan[i].jumlahPesanan * data.pesananPelanggan[i].hargaPesanan)
        }
        return (totalprice)
    }

    moveData = () => {
        firestore()
            .collection('pesanan')
            .doc(this.state.modalID)
            .update({
                pesananStatus : Number(2),
            })
            .then(() => {
                console.log('Order Accepted');
                this.props.navigation.navigate('Onprocesspageadmin')
                this.setState({
                    modal : false
                })

            });
    }

    alertAcc = () => {
        return (
            Alert.alert(
                "Terima Pesanan",
                "Apakah anda yakin menerima pesanan ini ?",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    { text: "OK", onPress: () => this.moveData() },

                ],
                { cancelable: true }
            )
        )
    }

    AccOrderan = () => {

        return (
            <Modal
                transparent={true}
                visible={this.state.modal}
                animationType="slide">
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <BlurView
                        style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
                        blurType="dark"
                        blurRadius={1}
                        reducedTransparencyFallbackColor="white"
                    />
                    <View style={{
                        height: '70%', backgroundColor: 'white', borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ backgroundColor: '#e8e8e8', width: 40, height: 5, borderRadius: 10, margin: 20 }}>

                            </View>
                        </View>
                        <View style={{paddingBottom : 20, justifyContent : 'center', alignItems : 'center'}}>
                           <Text style={{fontWeight : 'bold', fontSize :16}}>{`${this.state.modalNama} (${this.state.modalTempat})`}</Text>
                        </View>
                        <ScrollView>
                            <View>
                               {this.state.modalData.map((modal,index)=>
                                   <View key={index}
                                       style={{ paddingHorizontal: 20 }}>
                                       <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#dedede', paddingBottom: 20, paddingTop: 20 }}>
                                           <View style={{ flex: 1 }}>
                                               <View style={{ borderWidth: 1, borderColor: '#e8e8e8', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                   <Text style={{ color: '#33a0c4', fontWeight: 'bold' }}>
                                                       {modal.jumlahPesanan}x
                                                </Text>
                                               </View>
                                           </View>
                                           <View style={{ flex: 3 }}>
                                               <Text style={{ fontWeight: 'bold' }}>{modal.namaPesanan}</Text>
                                               <Text style={{ color: '#bdbdbd', paddingBottom: 5 }}>{modal.keteranganPesanan}</Text>
                                           </View>
                                           <View style={{ flex: 2, alignItems: 'flex-end' }}>
                                               <Text>
                                                   {modal.hargaPesanan}
                                            </Text>
                                           </View>
                                       </View>
                                   </View>
                               )}
                                
                            </View>
                            <View style={{ paddingHorizontal: 10, display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({modal :false })}
                                    style={{
                                        backgroundColor: 'white', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '45%', borderWidth: 1, borderColor: '#F16A3C'
                                    }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                        <Text style={{ color: '#F16A3C', fontWeight: 'bold', fontSize: 16, }}>Kembali</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.alertAcc()}
                                    style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '45%' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Terima Pesanan</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }

    returnList = () => {
        if(this.state.pesananList.length > 0){
            return(
                <React.Fragment>
                    {this.state.pesananList.map((pesanan, index) =>
                        <TouchableOpacity
                            onPress={() => this.setState({ modal: true, modalData: pesanan._data.pesananPelanggan, modalNama: pesanan._data.namaPelanggan, modalTempat: pesanan._data.tempatPelanggan, modalID: pesanan.id })}
                            key={index} style={{ width: '90%', height: 100, borderBottomWidth: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    {pesanan._data.namaPelanggan}
                                </Text>
                                <Text style={{ color: '#33a0c4' }}>
                                    {this.sumOrderan(pesanan._data)} item dipesan
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                    {this.sumPrice(pesanan._data).toLocaleString('id-ID', {
                                        currency: 'IDR', style: 'currency', minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </Text>
                                <Text>
                                    Total harga
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </React.Fragment>
            )
        } else {
            <View style={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
                <Text>Belum ada pesanan masuk</Text>
            </View>
        }
    }

    render() {
        return (
            <View>
                {console.log(this.state.pesananList)}
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#dedede', flexDirection : "row", alignItems : "center" }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Homepageadmin')}
                            style={{ justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                            <Image
                                source={home}
                                style={{ width: 32, height: 32 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                            Order Masuk
                        </Text>
                        <Text style={{ fontSize: 16, color: '#999999' }}>
                            Cafe Intaran
                        </Text>
                        {this.AccOrderan()}
                    </View>
                </View>
               <ScrollView>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {this.returnList()}
                    </View>
               </ScrollView>
            </View>
        )
    }
}

export default Orderpageadmin;