import React, { Component,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Modal, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CropView } from 'react-native-image-crop-tools';
import firestore from '@react-native-firebase/firestore';
import storeimage from '../src/image/shops.png'
import { BlurView, VibrancyView } from "@react-native-community/blur";
import home from '../src/image/home.png'
class Profilepageadmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
           profile : [],
           modal : false,
           modal2 : false,
           imagepick : '',
           namaRes : '',
           almatRes : '',
           pesananList: [],
            modal3: false,
            modalData: [],
            modalNama: '',
            modalTempat: '',
            modalID: '',
            isLoading : false
        }
        this.autoGetProfile()
        this.autoGetPesanan()
    }

    updateInputVal = (val, prop) => {

        const state = this.state;
        state[prop] = val;
        this.setState(state);

    }

    autoGetProfile = () =>{
        firestore()
            .collection("profileadmin")
            .doc('EuNEkgIYpdOK2uWTRY7n')
            .onSnapshot(docs => {
                this.setState({
                    profile: docs.data()
                })
            })
    }

    pickImage = () => {
        ImagePicker.openPicker({
            width: 900,
            height: 900,
            cropping: true,
            compressImageQuality: 1,
            includeBase64: true
        }).then(image => {
            console.log(image);
            this.setState({
                imagepick: image,
                modal2: false
            })
        });

    }

    captureImage = () => {
        ImagePicker.openCamera({
            width: 900,
            height: 900,
            cropping: true,
            compressImageQuality: 1,
            includeBase64: true
        }).then(image => {
            console.log(image);
            this.setState({
                imagepick: image,
                modal2: false
            })
        });

    }

    pilihGambar = () => {

        return (
            <Modal
                transparent={true}
                visible={this.state.modal2}
                animationType="slide">
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <BlurView
                        style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
                        blurType="dark"
                        blurRadius={1}
                        reducedTransparencyFallbackColor="white"
                    />
                    <View style={{
                        height: 280, backgroundColor: 'white', borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ backgroundColor: '#e8e8e8', width: 40, height: 5, borderRadius: 10, margin: 20 }}>

                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.captureImage()}
                                style={{ backgroundColor: '#F16A3C', marginHorizontal: 10, marginVertical: 5, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', height: 50, justifyContent: 'space-around', width: '100%', alignItems: "center" }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Ambil Gambar</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.pickImage()}
                                style={{ backgroundColor: '#F16A3C', marginHorizontal: 10, marginVertical: 5, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', height: 50, justifyContent: 'space-around', width: '100%', alignItems: "center" }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Ambil dari Galeri</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ modal2: false })}
                                style={{ backgroundColor: '#F16A3C', marginHorizontal: 10, marginVertical: 5, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', height: 50, justifyContent: 'space-around', width: '100%', alignItems: "center" }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    editProfile = () => {

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
                        height: '90%', backgroundColor: 'white', borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ backgroundColor: '#e8e8e8', width: 40, height: 5, borderRadius: 10, margin: 20 }}>

                            </View>
                        </View>
                        <View style={{ paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text>
                        </View>
                        <ScrollView>
                            {this.pilihGambar()}
                            <View>
                               <View>
                                   <TouchableOpacity 
                                        onPress={()=>this.setState({modal2 : true})}
                                        style={{width : '100%', justifyContent : "center", alignItems : "center", marginBottom : 40, marginTop : 10}}>
                                        <View style={{ width: 200, height: 200}}>
                                            {this.state.imagepick ?
                                                (
                                                    <Image 
                                                    source={{ uri: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}` }}
                                                     style={{
                                                        flex: 1,
                                                        width: null,
                                                        height: null,
                                                        resizeMode: "cover",
                                                        borderRadius: 10

                                                    }} />
                                                    ) : 
                                                (   
                                                    <Image source={storeimage} style={{
                                                        flex: 1,
                                                        width: null,
                                                        height: null,
                                                        resizeMode: "cover",
                                                        borderRadius: 10

                                                    }} />
                                                )
                                            }
                                        </View>
                                   </TouchableOpacity>
                                    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                                        <Text style={{ marginBottom: 5 }}>Nama Restoran :</Text>
                                        <TextInput
                                            placeholder="1Done"
                                            value={`${this.state.namaRes}`}
                                            style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: '#999999', borderWidth: 1 }}
                                            onChangeText={(val) => this.updateInputVal(val, 'namaRes')}
                                        />
                                    </View>
                                    <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                                        <Text style={{ marginBottom: 5 }}>Alamat Restoran :</Text>
                                        <TextInput
                                            placeholder="Jl. Nangka no.5"
                                            value={`${this.state.alamatRes}`}
                                            style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: '#999999', borderWidth: 1 }}
                                            onChangeText={(val) => this.updateInputVal(val, 'alamatRes')}
                                        />
                                    </View>
                               </View>
                            </View>
                            <View style={{ paddingHorizontal: 10, display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ modal: false })}
                                    style={{
                                        backgroundColor: 'white', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '45%', borderWidth: 1, borderColor: '#F16A3C'
                                    }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                        <Text style={{ color: '#F16A3C', fontWeight: 'bold', fontSize: 16, }}>Batal</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.alertSave()}
                                    style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '45%' }}>
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

    updateProfile = () => {
        if (this.state.imagepick) {
            firestore()
                .collection('profileadmin')
                .doc('EuNEkgIYpdOK2uWTRY7n')
                .update({
                    Nama: this.state.namaRes,
                    Alamat : this.state.alamatRes,
                    FotoAdmin: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}`
                })
                .then(() => {
                    console.log('Profile Updated!');
                    this.setState({modal : false})
                });
        } else {
            firestore()
                .collection('foodList')
                .doc('EuNEkgIYpdOK2uWTRY7n')
                .update({
                    Nama: this.state.namaRes,
                    Alamat: this.state.almatRes,
                    FotoAdmin: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}`
                })
                .then(() => {
                    console.log('Profile updated!');
                    this.setState({ modal: false })
                });
        }

    }

    alertSave = () => {
        return (
            Alert.alert(
                "Simpan Perubahan",
                "Apakah anda yakin menyimpan perubahan ini ?",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    { text: "OK", onPress: () => this.updateProfile() }
                ],
                { cancelable: true }
            )
        )
    }

    imageReturn = () => {
        console.log('fotoadmin', this.state.profile.FotoAdmin)
        if (this.state.imagepick < 1){
           return (
               <Image source={storeimage} style={{
                   flex: 1,
                   width: null,
                   height: null,
                   resizeMode: "cover",
                   borderRadius: 10

               }} />
           )
       } else {
           return (
               <Image source={{ uri: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}` }} style={{
                   flex: 1,
                   width: null,
                   height: null,
                   resizeMode: "cover",
                   borderRadius: 10

               }} />
           )
       }
    }

    //List History
    autoGetPesanan = () => {
        firestore()
            .collection("pesanan")
            .where('pesananStatus', '==', 3)
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
                pesananStatus: Number(3),
            })
            .then(() => {
                console.log('Order Accepted');
                this.setState({
                    modal: false
                })
            });
    }

    // alertAcc = () => {
    //     return (
    //         Alert.alert(
    //             "Terima Pesanan",
    //             "Apakah anda yakin menerima pesanan ini ?",
    //             [
    //                 {
    //                     text: 'Cancel',
    //                     onPress: () => console.log('Cancel Pressed'),
    //                     style: 'cancel'
    //                 },
    //                 { text: "OK", onPress: () => this.moveData() },

    //             ],
    //             { cancelable: true }
    //         )
    //     )
    // }

    Orderan = () => {

        return (
            <Modal
                transparent={true}
                visible={this.state.modal3}
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
                        <View style={{ paddingBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{`${this.state.modalNama} (${this.state.modalTempat})`}</Text>
                        </View>
                        <ScrollView>
                            <View>
                                {this.state.modalData.map((modal, index) =>
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
                                    onPress={() => this.setState({ modal3: false })}
                                    style={{
                                        backgroundColor: 'white', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '90%', borderWidth: 1, borderColor: '#F16A3C'
                                    }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                        <Text style={{ color: '#F16A3C', fontWeight: 'bold', fontSize: 16, }}>Kembali</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }

    listReturn = () => {
        if (this.state.pesananList.length > 0){
            return (
                <React.Fragment>
                    {this.state.pesananList.map((pesanan, index) =>
                        <TouchableOpacity
                            onPress={() => this.setState({ modal3: true, modalData: pesanan._data.pesananPelanggan, modalNama: pesanan._data.namaPelanggan, modalTempat: pesanan._data.tempatPelanggan, modalID: pesanan.id })}
                            key={index} style={{ width: '90%', height: 100, borderBottomWidth: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#dedede' }}>
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
            return (
                <View style={{width : '100%', alignItems : "center", justifyContent : "center"}}>
                    <Text>Belum ada riwayat</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
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
                            Profile
                    </Text>
                        <Text style={{ fontSize: 16, color: '#999999' }}>
                            Restoran Anda
                    </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop : 20 }}>
                        <View style={{ width: '90%', height: 300, borderWidth: 1, borderColor : '#dedede', borderRadius : 5, justifyContent: "center", alignItems: 'center' }}>
                            <View style={{ width: 100, height: 100, backgroundColor: '#dedede', borderRadius: 100 }}>
                                {this.imageReturn()}
                            </View>
                            {this.editProfile()}
                            {this.Orderan()}
                            <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: 10, marginTop: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, paddingVertical: 5 }}>
                                    {this.state.profile.Nama}
                                </Text>
                                <Text style={{ fontSize: 16, alignItems: "center", paddingVertical: 5, justifyContent: "center", textAlign: "center" }}>
                                    {this.state.profile.Alamat}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ modal: true, namaRes: this.state.profile.Nama, alamatRes: this.state.profile.Alamat })}>
                                <View style={{ backgroundColor: '#33a0c4', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 30 }}>
                                    <Text style={{ color: 'white', fontSize: 12 }}>Edit Profile</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{borderBottomWidth : 1, width : '90%', justifyContent : "center", alignItems : "center", marginTop : 25, paddingBottom : 5}}>
                                <Text style={{fontWeight : "bold", fontSize : 18}}>Riwayat Pesanan</Text>
                            </View>
                            {this.state.isLoading ? (<ActivityIndicator size="small" color="#33a0c4"/>)
                             : (this.listReturn())
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Profilepageadmin;