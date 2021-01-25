import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Bar, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import firestore from '@react-native-firebase/firestore';

class Detailfood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jumlah: 1,
            update: 0,
            foodDetail : [],
            isLoading : true,
            keterangan : '',
            addingbasket : false
        }
        this.autoGetFood()
    }
    
    autoGetFood = () => {
        firestore()
            .collection("foodList")
            .doc(this.props.route.params.idMakanan)
            .onSnapshot(docs => {
                this.setState({
                    foodDetail : docs.data(),
                    isLoading : false
                })
            })
    }

   
    updateInputVal = (val, prop) => {
       if(this.state.jumlah.length < 0 ){
           this.setState({
               jumlah : 0
           })
       } else {
           const state = this.state;
           state[prop] = val;
           this.setState(state);
       }
        console.log(this.state.keterangan)
    }

    minValue = () => {
        if(this.state.jumlah <= 0){
            this.setState ({
                jumlah : 0
            })
        } else {
            this.setState({
                jumlah: this.state.jumlah - 1
            })
        }
    }

    addToBasket = () => {
        if(this.state.jumlah<1){
            return(
                <TouchableOpacity
                    onPress={()=>this.props.navigation.goBack()}
                    style={{ backgroundColor: '#F16A3C', padding: 15, marginVertical: 50, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 18 }}>Kembali</Text>
                </TouchableOpacity>
            )
        } else if (this.state.addingbasket){
            return(
                <TouchableOpacity 
                    onPress={()=>this.addFood()}
                    style={{ display : "flex", flexDirection : "row", backgroundColor: '#F16A3C', padding: 15, marginVertical: 50, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16, paddingLeft : 10 }}>{`Menambahkan pesanan...`}</Text>
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity
                    onPress={() => this.addFood()}
                    style={{ backgroundColor: '#F16A3C', padding: 15, marginVertical: 50, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16 }}>{`Tambah Pesanan - ${(this.state.foodDetail.hargaMakanan * this.state.jumlah).toLocaleString('id-ID')}`}</Text>
                </TouchableOpacity>
            )
        }
    }

    //adding food to basket
    addFood = () => {
        this.setState({
            addingbasket : true
        })
        firestore()
        .collection("keranjang")
        .add({
            idMakananPesan : this.props.route.params.idMakanan,
            jumlahPesanan : this.state.jumlah,
            keteranganPesanan : this.state.keterangan,
            namaPesanan : this.state.foodDetail.namaMakanan,
            hargaPesanan: this.state.foodDetail.hargaMakanan,
            gambarPesanan: this.state.foodDetail.gambarMakanan,
            kategoriPesanan: this.state.foodDetail.kategoriMakanan,
        })
        setTimeout(
            function () {
                this.props.navigation.goBack();
            }
                .bind(this),
            1000
        );
        

    }

    render(){
        const { onChange } = this.props;
        if (this.state.isLoading){
            return (
                <View style={{flex : 1, justifyContent : "center", alignItems : 'center'}}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                    <Text>Loading...</Text>
                </View>
            )
        }
        return(
            <ScrollView>    
                    {console.log(this.state.foodDetail)}               
                    <View style={{
                        height: 200, width: '100%', borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    }}>
                
                        <Image
                            source={{ uri: this.state.foodDetail.gambarMakanan }}
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
                <View style={{ padding: 30, borderBottomWidth: 1, borderBottomColor: '#d4d4d4'}}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                {this.state.foodDetail.namaMakanan}
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#F16A3C' }}>
                                {this.state.foodDetail.hargaMakanan.toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}
                            </Text>
                        </View>
                        <View>
                            <Text style={{color : '#999999'}}>{this.state.foodDetail.kategoriMakanan}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 20, borderBottomWidth: 1, borderBottomColor: '#d4d4d4', paddingBottom : 20}}>
                        <Text style={{ paddingHorizontal: 30, fontSize : 16, fontWeight : 'bold', marginBottom : 10}}>Catatan khusus</Text>
                        <TextInput
                            style={{backgroundColor : '#ededed', paddingHorizontal : 30}}
                            placeholder='Tambahan anda'
                            onChangeText={(val) => this.updateInputVal(val, 'keterangan')}
                            value={this.state.keterangan}
                        />
                    </View>
                    <View style={{display : "flex", flexDirection : "row", alignItems : 'center', justifyContent : 'center', paddingTop : 20}}>
                        <TouchableOpacity 
                            onPress={() => this.minValue()}
                            style={{borderWidth : 1, padding :  5, borderRadius : 5, borderColor : '#d4d4d4'}}>
                            <Icon name='minus-outline' width={30} height={30} fill='#F16A3C'  />
                        </TouchableOpacity>
                        <View>
                            <TextInput
                                defaultValue={`${1}`}
                                returnKeyType='done'
                                keyboardType='number-pad'
                                value={`${this.state.jumlah}`}
                                style={{width: 80, padding : 0, height : 40, textAlign : "center", fontSize : 24, fontWeight : 'bold'}}
                                onChangeText={(val) => this.updateInputVal(val, 'jumlah')}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={()=>this.setState({jumlah : this.state.jumlah + 1})}
                            style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: '#d4d4d4' }}>
                            <Icon name='plus-outline' width={30} height={30} fill='#F16A3C' />
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal : 30}}>
                       {this.addToBasket()}
                    </View>
            </ScrollView>
        )
    }
}


export default Detailfood;