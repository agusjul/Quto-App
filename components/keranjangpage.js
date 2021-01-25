import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import firestore from '@react-native-firebase/firestore';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { useScrollToTop } from '@react-navigation/native';
import { ceil } from 'react-native-reanimated';

class Keranjangpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodList: [],
            keranjangList: [],
            basketList: [],
            hargaTotal: 0,
            modal : false,
            modalData : [],
            keterangan : '',
            jumlah : 0,
            keranjangid : '',
            namaPelanggan : '',
            tempatPelanggan : ''
        }
        this.autoGetKeranjang()
    }

    

    cariIDKeranjang = (keranjang) => {
        this.setState({ modal: true, modalData: keranjang, jumlah: keranjang.jumlahPesanan, keterangan: keranjang.keteranganPesanan })
        firestore()
            .collection('keranjang')
            // Filter results
            .where('idMakananPesan', '==', keranjang.idMakananPesan)
            .get()
            .then(documentSnapshot => {
               this.setState({
                   keranjangid: documentSnapshot.docs[0].id
               })
            });
    }

    autoGetKeranjang = () => {
        firestore()
            .collection("keranjang")
            .onSnapshot(docs => {
                let anykeranjang = []
                docs.forEach(doc => {
                    anykeranjang.push(doc.data())
                })
                this.setState({
                    keranjangList: anykeranjang
                })
            })

    }

    updateInputVal = (val, prop) => {
        if (this.state.jumlah.length < 0) {
            this.setState({
                jumlah: 0
            })
        } else {
            const state = this.state;
            state[prop] = val;
            this.setState(state);
        }
    }

    minValue = () => {
        if (this.state.jumlah <= 0) {
            this.setState({
                jumlah: 0
            })
        } else {
            this.setState({
                jumlah: this.state.jumlah - 1
            })
        }
    }

    sumPrice = () => {
        var totalid = 0
        for (var i = 0; i < this.state.keranjangList.length; i++) {
            totalid += (this.state.keranjangList[i].hargaPesanan * this.state.keranjangList[i].jumlahPesanan)
        }
        return (totalid)
    } 

    updatePesanan = () => {
        firestore()
            .collection('keranjang')
            .doc(`${this.state.keranjangid}`)
            .update({
                'jumlahPesanan': this.state.jumlah,
                'keteranganPesanan': this.state.keterangan
            })
            .then(() => {
                console.log('updated!');
                this.setState({
                    modal : false
                })
            });
        
    } 

    editMenu = () => {
        
        return(
            <Modal
                transparent={true}
                visible={this.state.modal}
                animationType="slide">
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                    <BlurView
                        style={{position : "absolute", top : 0 , bottom : 0, right : 0, left : 0}}
                        blurType="dark"
                        blurRadius={1}
                        reducedTransparencyFallbackColor="white"
                    />
                    <View style={{
                        height: '90%', backgroundColor: 'white', borderTopLeftRadius: 20,
                        borderTopRightRadius: 20}}>
                        <View style={{justifyContent : "center", alignItems : "center"}}>
                            <View style={{ backgroundColor: '#e8e8e8', width: 40, height: 5, borderRadius: 10, margin: 20 }}>

                            </View>
                        </View>
                        <ScrollView>
                            <View style={{
                                height: 150, width: '100%', borderTopLeftRadius: 20,
                                borderTopRightRadius: 20
                            }}>

                                <Image
                                    source={{ uri: this.state.modalData.gambarPesanan }}
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
                            <View style={{ padding: 30, borderBottomWidth: 1, borderBottomColor: '#d4d4d4' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                        {this.state.modalData.namaPesanan}
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#F16A3C' }}>
                                        {this.state.modalData.hargaPesanan.toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#999999' }}>{this.state.modalData.kategoriPesanan}</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 20, borderBottomWidth: 1, borderBottomColor: '#d4d4d4', paddingBottom: 20 }}>
                                <Text style={{ paddingHorizontal: 30, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Catatan khusus</Text>
                                <TextInput
                                    style={{ backgroundColor: '#ededed', paddingHorizontal: 30 }}
                                    placeholder='Tambahan anda'
                                    onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
                                    value={this.state.keterangan}
                                />
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.minValue()}
                                    style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: '#d4d4d4' }}>
                                    <Icon name='minus-outline' width={30} height={30} fill='#F16A3C' />
                                </TouchableOpacity>
                                <View>
                                    <TextInput
                                        defaultValue={`${1}`}
                                        returnKeyType='done'
                                        keyboardType='number-pad'
                                        value={`${this.state.jumlah}`}
                                        style={{ width: 80, padding: 0, height: 40, textAlign: "center", fontSize: 24, fontWeight: 'bold' }}
                                        onChangeText={(val) => this.updateInputVal(val, 'jumlah')}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.setState({ jumlah: this.state.jumlah + 1 })}
                                    style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: '#d4d4d4' }}>
                                    <Icon name='plus-outline' width={30} height={30} fill='#F16A3C' />
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingHorizontal: 30, display : "flex", flexDirection : "row", justifyContent : 'space-between', marginTop : 20 }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modal: false })}
                                    style={{
                                        backgroundColor: 'white', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '40%', borderWidth: 1, borderColor: '#F16A3C'}}>
                                    <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                        <Text style={{ color: '#F16A3C', fontWeight: 'bold', fontSize: 16, }}>Batal</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=> this.updatePesanan()}
                                    style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '40%'}}>
                                    <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Simpan</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
               </View>
            </Modal>
        )
    }

    orderPesanan = () => {
        firestore()
            .collection('pesanan')
            .add({
                namaPelanggan : this.state.namaPelanggan,
                tempatPelanggan : this.state.tempatPelanggan,
                pesananPelanggan : this.state.keranjangList,
                pesananStatus : 1
            })
            .then(() => {
                console.log('Dipesan');
                Alert.alert(
                    "Dipesan",
                    "Terimakasih, makananmu sudah dipesan harap menunggu :)",
                    [
                       
                        { text: "OK", onPress: () => this.props.navigation.navigate("Foodpage") }
                    ],
                    { cancelable: false }
                );
            });

        
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                {console.log(this.state.keranjangid)}
                <View style={{
                    padding: 10, borderBottomWidth: 1, borderBottomColor: '#dedede', backgroundColor : 'white'}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                        Keranjang Pesanan
                    </Text>
                    <Text style={{ fontSize: 16, color: '#999999' }}>
                        Cafe Intaran
                    </Text>
                </View>
                <ScrollView>
                   <View style={{marginTop : 10, paddingBottom : 10}}>
                        <View style={{marginBottom : 20}}>
                            <View style={{ borderBottomWidth : 1, borderBottomColor : '#dedede', padding: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgba(241, 106, 60, 0.9)' }}>
                                    Diantar menuju
                                </Text>
                            </View>
                            <View style={{ marginVertical: 10, marginHorizontal : 20 }}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{marginBottom : 3}}>Nama Pelanggan :</Text>
                                    <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius : 8}}>
                                        <TextInput
                                            placeholder ="John Doe"
                                            value={`${this.state.namaPelanggan}`}
                                            style={{paddingHorizontal : 10, paddingVertical :5}}
                                            onChangeText={(val) => this.updateInputVal(val, 'namaPelanggan')}
                                        />
                                    </View>
                                </View>
                                <View style={{marginVertical : 10}}>
                                    <Text style={{ marginBottom: 3 }}>Tempat :</Text>
                                    <View style={{ backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8 }}>
                                        <TextInput
                                            placeholder="Meja 3"
                                            value={`${this.state.tempatPelanggan}`}
                                            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                                            onChangeText={(val) => this.updateInputVal(val, 'tempatPelanggan')}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#dedede', padding: 10, display : "flex", flexDirection : "row", justifyContent : 'space-between', alignItems : 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'rgba(241, 106, 60, 0.9)' }}>
                                    Rincian Pesanan
                                </Text>
                                <Text 
                                    onPress={()=>this.props.navigation.navigate("Listfood")}
                                    style={{ paddingRight: 10, color: '#33a0c4', fontWeight : "bold"}}>
                                    add item
                                </Text>
                            </View>
                            {this.state.modal ? this.editMenu() : null}
                            {this.state.keranjangList.map((keranjang) =>

                                <TouchableOpacity
                                    onPress={()=>this.cariIDKeranjang(keranjang)}
                                    key={keranjang.idMakananPesan} style={{ paddingHorizontal: 20 }}>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#dedede', paddingBottom: 20, paddingTop: 20 }}>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ borderWidth: 1, borderColor: '#e8e8e8', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                                <Text style={{ color: '#33a0c4', fontWeight: 'bold' }}>
                                                    {`${keranjang.jumlahPesanan}`}x
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 3 }}>
                                            <Text style={{ fontWeight: 'bold' }}>{keranjang.namaPesanan}</Text>
                                            {keranjang.keteranganPesanan ? (<Text style={{ color: '#bdbdbd', paddingBottom: 5 }}>{keranjang.keteranganPesanan}</Text>) : null}
                                            <Text style={{ color: '#33a0c4', fontSize: 13 }}>Edit</Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text>
                                                {keranjang.hargaPesanan.toLocaleString('id-ID')}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop : 20 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingVertical : 3, justifyContent: 'space-between' }} >
                                <Text>Subtotal</Text>
                                <Text>{this.sumPrice().toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}</Text>
                            </View>
                            <View style={{ display: 'flex', paddingVertical: 3, flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text>Tax (PPN) 3%</Text>
                                <Text>{(this.sumPrice() * 0.03).toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}</Text>

                            </View>
                        </View>
                   </View>
                </ScrollView>
                <View>
                    <View 
                        style={{display : "flex", 
                                flexDirection : 'row', 
                                justifyContent : 'space-between', 
                                marginHorizontal : 20, 
                                paddingTop : 10,
                                }}>
                        <Text style={{fontSize : 16, fontWeight : 'bold'}}>
                            Total
                        </Text>
                        <Text style={{fontSize : 16, fontWeight : 'bold'}}>
                            {(this.sumPrice() * 1.03).toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.orderPesanan()}
                        style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center',  }}>
                        <View style={{ display: 'flex', flexDirection: 'row', height: 50, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize : 16 }}>Pesan Sekarang</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Keranjangpage;