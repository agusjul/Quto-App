import React, { Component } from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import image1 from '../src/image/zamato/1.jpg'
import image2 from '../src/image/zamato/2.jpg';
import image3 from '../src/image/zamato/3.jpg';
import image4 from '../src/image/zamato/4.jpg';
import image5 from '../src/image/zamato/5.jpg';

class ListFood extends Component {
    render(){
        return(
            <ScrollView>
                <View>
                    {/* Header */}
                    <View style={{borderWidth : 1, padding : 10,}}>
                        <Text style={{fontSize : 20, fontWeight : 'bold',}}>
                            Cafe Intaran
                        </Text>
                        <Text style={{ fontSize: 16, color : '#999999' }}>
                            Jalan Gatsu Tengah no. 134, Gedung Dharma Negara Anglaya
                        </Text>
                    </View>
                    <View style={{borderBottomWidth : 1, display : "flex", flexDirection : 'row', paddingHorizontal : 10, paddingVertical : 20, borderColor : '#999999'}}>
                        <View style={{width : 120, height : 120}}>
                            <Image source={image1} style={{
                                flex: 1,
                                width: null,
                                height: null,
                                resizeMode: "cover",
                                borderRadius : 10
                                
                                }}/>
                        </View>
                        <View style={{justifyContent : 'space-around', marginLeft : 20}}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    Nasi Biryani
                                </Text>
                                    <Text style={{ color: '#999999', fontSize: 16 }}>
                                        Indonesian Food
                                </Text>
                            </View>
                            <Text style={{ color: '#1FAD4F', fontWeight : 'bold'}}>
                                Rp. 25.000
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, display: "flex", flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderColor: '#999999' }}>
                        <View style={{ width: 120, height: 120 }}>
                            <Image source={image2} style={{
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
                                    Nasi Biryani
                                </Text>
                                <Text style={{ color: '#999999', fontSize: 16 }}>
                                    Indonesian Food
                                </Text>
                            </View>
                            <Text style={{ color: '#1FAD4F', fontWeight: 'bold' }}>
                                Rp. 25.000
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, display: "flex", flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderColor: '#999999' }}>
                        <View style={{ width: 120, height: 120 }}>
                            <Image source={image3} style={{
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
                                    Nasi Biryani
                                </Text>
                                <Text style={{ color: '#999999', fontSize: 16 }}>
                                    Indonesian Food
                                </Text>
                            </View>
                            <Text style={{ color: '#1FAD4F', fontWeight: 'bold' }}>
                                Rp. 25.000
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, display: "flex", flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderColor: '#999999' }}>
                        <View style={{ width: 120, height: 120 }}>
                            <Image source={image4} style={{
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
                                    Nasi Biryani
                                </Text>
                                <Text style={{ color: '#999999', fontSize: 16 }}>
                                    Indonesian Food
                                </Text>
                            </View>
                            <Text style={{ color: '#1FAD4F', fontWeight: 'bold' }}>
                                Rp. 25.000
                            </Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, display: "flex", flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20, borderColor: '#999999' }}>
                        <View style={{ width: 120, height: 120 }}>
                            <Image source={image5} style={{
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
                                    Nasi Biryani
                                </Text>
                                <Text style={{ color: '#999999', fontSize: 16 }}>
                                    Indonesian Food
                                </Text>
                            </View>
                            <Text style={{ color: '#1FAD4F', fontWeight: 'bold' }}>
                                Rp. 25.000
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default ListFood;