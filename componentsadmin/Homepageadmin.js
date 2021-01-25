import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CropView } from 'react-native-image-crop-tools';
import firestore from '@react-native-firebase/firestore';

class Homepageadmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pesananList: [],
            onprocessList : [],
            menuList : [],
            historyList : []
        }
        this.autoGetPesanan()
        this.autoGetFood()
        this.autoGetProcess()
        this.autoGetHistory()
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
    }
    autoGetProcess = () => {
        firestore()
            .collection("pesanan")
            .where('pesananStatus', '==', 2)
            .get()
            .then(querySnapshot => {
                let anypesanan = []
                querySnapshot.forEach(doc => {
                    anypesanan.push(doc)
                })
                this.setState({
                    onprocessList: anypesanan
                })
            });
    }

    autoGetHistory = () => {
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
                    historyList: anypesanan
                })
            });
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
                    menuList: anyfoodlist
                })
            })
    }
    
    render() {
        return (
            <View>
                {console.log(this.state)}
                <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#dedede' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                       Dashboard
                    </Text>
                    <Text style={{ fontSize: 16, color: '#999999' }}>
                        Cafe Intaran
                    </Text>
                </View>
                <View style={{display : 'flex', justifyContent : 'center', alignItems : 'center', paddingTop : 20}}>
                    <TouchableOpacity style={{width : '90%', marginBottom : 10}}
                        onPress={()=>this.props.navigation.navigate('Orderpageadmin')}
                    >
                        <View style={{ height: 100, width: '100%', borderRadius: 10, backgroundColor: 'rgba(5, 102, 116,0.2)', paddingHorizontal : 20, justifyContent : 'center'}}>
                            <Text style={{ color: 'rgb(5, 102, 116)', fontSize: 36, fontWeight : 'bold' }}>
                                {this.state.pesananList.length}
                            </Text>
                            <Text style={{ color: 'rgb(5, 102, 116)', fontSize : 16}}>
                                Pesanan
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Onprocesspageadmin')}
                        style={{ width: '90%', marginBottom: 10 }}>
                        <View style={{ height: 100, width: '100%', borderRadius: 10, backgroundColor: 'rgba(189, 23, 23,0.2)', paddingHorizontal: 20, justifyContent: 'center' }}>
                            <Text style={{ color: 'rgb(189, 23, 23)', fontSize: 36, fontWeight: 'bold' }}>
                                {this.state.onprocessList.length}
                            </Text>
                            <Text style={{ color: 'rgb(189, 23, 23)', fontSize: 16 }}>
                                On Proses
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '90%', marginBottom: 10 }} onPress={() => this.props.navigation.navigate("Listmenuadmin")}>
                        <View style={{ height: 100, width: '100%', borderRadius: 10, backgroundColor: 'rgba(90, 17, 158,0.2)', paddingHorizontal: 20, justifyContent: 'center' }}>
                            <Text style={{ color: 'rgb(90, 17, 158)', fontSize: 36, fontWeight: 'bold' }}>
                                {this.state.menuList.length}
                            </Text>
                            <Text style={{ color: 'rgb(90, 17, 158)', fontSize: 16 }}>
                                List Menu
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '90%', marginBottom: 10 }} onPress={() => this.props.navigation.navigate("Profilepageadmin")}>
                        <View style={{ height: 100, width: '100%', borderRadius: 10, backgroundColor: 'rgba(90, 17, 158,0.2)', paddingHorizontal: 20, justifyContent: 'center' }}>
                            <Text style={{ color: 'rgb(90, 17, 158)', fontSize: 36, fontWeight: 'bold' }}>
                                Edit
                            </Text>
                            <Text style={{ color: 'rgb(90, 17, 158)', fontSize: 16 }}>
                                Profile Admin
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Homepageadmin;