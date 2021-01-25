import React, { Component } from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, findNodeHandle} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TextPath } from 'react-native-svg';

class ListFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foodList: [],
            keranjangList : [],
            basketList : [],
            hargaTotal : 0
        }
       this.autoGetFood()
       this.autoGetKeranjang()
       
    }

    autoGetFood = () => {
        firestore()
            .collection("foodList")
            .onSnapshot(docs => {
                let anyfoodlist = []
                docs.forEach(doc => {
                    anyfoodlist.push(doc)
                })
                this.setState({
                    foodList: anyfoodlist
                })
            })
    }

    //Mencari makanan di keranjang
   sumPrice = () => {
       var totalid = 0
       for (var i = 0; i < this.state.keranjangList.length; i++) {
           totalid += this.state.keranjangList[i].hargaPesanan 
       }
       return totalid
   } 

    sumTotal = () => {
        var totalid = 0
        for (var i = 0; i < this.state.keranjangList.length; i++) {
            totalid += this.state.keranjangList[i].jumlahPesanan
        }
        return totalid
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

    lihatKeranjang = () => {
        if(this.state.keranjangList.length<1){
            return(
                null
            )
        } else {
            return(
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Keranjangpage")}
                    style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 50, justifyContent: 'space-around', width: '100%', alignItems: "center" }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Pesanan Anda</Text>
                        <Text style={{ color: 'white' }}>{`${this.sumTotal().toLocaleString('id-ID')} item`}</Text>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>{this.sumPrice().toLocaleString('id-ID')}</Text>
                    </View>
                  
                </TouchableOpacity>
            )
        }
    }

    render(){
        return(
            <View style={{flex : 1}}>
                {console.log(this.state.keranjangList)}
                <View style={{ padding: 10, borderBottomWidth : 1, borderBottomColor : '#dedede'}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                        Cafe Intaran
                    </Text>
                    <Text style={{ fontSize: 16, color: '#999999' }}>
                        Jalan Gatsu Tengah no. 134, Gedung Dharma Negara Anglaya
                    </Text>
                </View>
            <ScrollView>
                <View style={{paddingHorizontal : 20}}>
                   {this.state.foodList.map((food)=>
                       <TouchableOpacity
                           key={food.id}
                           onPress={() => this.props.navigation.navigate('Detailfood', { idMakanan: food.id })}
                           style={{ borderBottomWidth: 1, display: "flex", flexDirection: 'row', paddingVertical: 20, borderColor: '#dedede' }}>
                           <View style={{ width: 120, height: 120 }}>
                               <Image source={{ uri: food._data.gambarMakanan }} style={{
                                   flex: 1,
                                   width: null,
                                   height: null,
                                   resizeMode: "cover",
                                   borderRadius: 10

                               }} />
                           </View>
                           <View style={{ justifyContent: 'space-around', marginLeft: 20 }}>
                               <View>
                                   <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                       {food._data.namaMakanan}
                                </Text>
                                   <Text style={{ color: '#999999', fontSize: 16 }}>
                                       {food._data.kategoriMakanan}
                                </Text>
                               </View>
                               <Text style={{ color: '#1FAD4F', fontWeight: 'bold' }}>
                                   {food._data.hargaMakanan.toLocaleString('id-ID', { currency: 'IDR', style: 'currency' })}
                                </Text>
                           </View>
                       </TouchableOpacity>
                   )}
                </View>
            </ScrollView>
            <View>
                {this.lihatKeranjang()}
            </View>
            </View>
        )
    }
}

export default ListFood;