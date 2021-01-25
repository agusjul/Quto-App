import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, findNodeHandle, Modal } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TextPath } from 'react-native-svg';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import home from '../src/image/home.png'
class Listmenuadmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foodList: [],
            keranjangList: [],
            basketList: [],
            hargaTotal: 0,
            modal : false,
            modalData : []
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
            return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Addmenuadmin")}
                    style={{ backgroundColor: '#F16A3C', margin: 10, borderRadius: 5, display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 50, justifyContent: 'space-around', width: '100%', alignItems: "center" }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Tambahkan Menu Baru</Text>
                    </View>
                </TouchableOpacity>
            )
    }

   
    render() {
        return (
            <View style={{ flex: 1 }}>
                {console.log(this.state.foodList)}
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
                            List Menu
                            </Text>
                        <Text style={{ fontSize: 16, color: '#999999' }}>
                            Cafe Intaran
                            </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ paddingHorizontal: 20 }}>
                        {this.state.foodList.map((food) =>
                            <TouchableOpacity
                                key={food.id}
                                onPress={() => this.props.navigation.navigate('Editmenuadmin',{data : food})}
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
                                        {food._data.hargaMakanan.toLocaleString('id-ID', {
                                            currency: 'IDR', style: 'currency', minimumFractionDigits: 0,
                                            maximumFractionDigits: 0, })}
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

export default Listmenuadmin;