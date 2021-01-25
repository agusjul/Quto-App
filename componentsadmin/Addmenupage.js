import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, Image, Modal } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CropView } from 'react-native-image-crop-tools';
import image1 from '../src/image/photo.png'
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { ScrollView } from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';


class Addmenupage extends Component {
    state = {
        imagepick: '',
        modal : false,
        namaMenu : '',
        kategoriMenu : '',
        hargaMenu : ''
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
                modal : false
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
                modal : false
            })
        });
       
    }

    updateInputVal = (val, prop) => {
    
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        
    }

    pilihGambar = () => {

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
                                style={{ backgroundColor: '#F16A3C', marginHorizontal : 10, marginVertical : 5, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
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
                                onPress={() => this.setState({modal : false})}
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

    addMenu = () => {
        firestore()
            .collection('foodList')
            .add({
                namaMakanan : this.state.namaMenu,
                hargaMakanan: Number(this.state.hargaMenu),
                kategoriMakanan : this.state.kategoriMenu,
                gambarMakanan: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}`
            })
            .then(() => {
                console.log('Menu ditambahkan');
                this.props.navigation.goBack()
            });
    }

    alertMenu = () => {
        return(
            Alert.alert(
                "Penambahan Menu",
                "Apakah anda yakin menambahkan menu ini ?",
                [

                    { text: "OK", onPress: () => this.addMenu() }
                ],
                { cancelable: false }
            )
        )
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="height" style={{flex :1, marginBottom : 30}}>
                {this.pilihGambar()}
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#dedede' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                        Tambah Menu Baru
                    </Text>
                    <Text style={{ fontSize: 16, color: '#999999' }}>
                        Cafe Intaran
                    </Text>
                </View>
               <ScrollView>
                    <View style={{marginTop : 20}}>
                        <TouchableOpacity onPress={() => this.setState({ modal: true })} style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: 210, height: 210, borderWidth: 1, borderColor: '#999999', borderRadius: 10, justifyContent: "center", alignItems: 'center' }}>
                                {this.state.imagepick ?
                                    (<Image
                                        source={{ uri: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}` }}
                                        style={{ width: 200, height: 200, borderRadius: 5 }}
                                    />) :
                                    (
                                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                            <Image
                                                source={image1}
                                                style={{ width: 48, height: 48 }}
                                            />
                                            <Text>
                                                Add Image
                                        </Text>
                                        </View>
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5 }}>Nama Menu :</Text>
                            <TextInput
                                placeholder="Nasi Putih"
                                value={`${this.state.namaMenu}`}
                                style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: '#999999', borderWidth: 1 }}
                                onChangeText={(val) => this.updateInputVal(val, 'namaMenu')}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5 }}>Kategori Menu :</Text>
                            <TextInput
                                placeholder="Indonesian"
                                value={`${this.state.kategoriMenu}`}
                                style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: '#999999', borderWidth: 1 }}
                                onChangeText={(val) => this.updateInputVal(val, 'kategoriMenu')}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 5 }}>Harga Menu :</Text>
                            <TextInput
                                placeholder="15.000"
                                value={(`${this.state.hargaMenu}`).toLocaleString('id-ID')}
                                style={{ paddingHorizontal: 10, paddingVertical: 5, borderColor: '#999999', borderWidth: 1 }}
                                keyboardType='number-pad'
                                onChangeText={(val) => this.updateInputVal(val, 'hargaMenu')}
                            />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 30, display: "flex", flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                backgroundColor: 'white', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '40%', borderWidth: 1, borderColor: '#F16A3C'
                            }}>
                            <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                <Text style={{ color: '#F16A3C', fontWeight: 'bold', fontSize: 16, }}>Batal</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.alertMenu()}
                            style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center', width: '40%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', height: 40, justifyContent: 'center', width: '100%', alignItems: "center" }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Simpan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
               </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default Addmenupage;