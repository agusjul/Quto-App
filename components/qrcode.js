import React, { Component } from 'react';
import {Linking, Text, TouchableOpacity, Alert, Button, View, ActivityIndicator} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from "react-native-camera";


export default class QrCode extends Component {

    state = {
        data : '',
        isFlashOn : false
    }

   ifScaned = (e) => {
      this.setState({
          data : e.data
      })
      this.props.navigation.navigate("Listfood")
      console.log(this.state.data)
   }

   render(){
       return(
           <QRCodeScanner
               containerStyle={{backgroundColor: "#fff", }}
               onRead={this.ifScaned}
               topViewStyle={{ backgroundColor: '#F16A3C', display : "flex" , justifyContent : 'center', paddingTop : 20, position : 'absolute', zIndex : 100, height : 100}}
               reactivate={true}
               permissionDialogMessage="Need Permission To Access Camera"
               reactivateTimeout={10}
               showMarker={true}
               markerStyle={{borderColor: "#fff", borderRadius : 10}}
               cameraStyle={{borderRadius : 90, top : 150}}
               flashMode={this.state.isFlashOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
               topContent={
                   <View>
                       <Text style={{fontSize : 24, fontWeight : 'bold', color : 'white'}}>
                           Scanner Quto App
                       </Text>
                   </View>
               }
               bottomContent={
                   <View style={{ paddingTop : 30}}>
                       <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center',}}>
                           <View style={{ height: 10 }}>
                               <ActivityIndicator size="large" color="white" />
                           </View>
                           <View style={{ height: 50, marginLeft: 20 }}>
                               <Text style={{ fontSize: 18, color: 'white' }}>
                                   Scanning QR
                                </Text>
                           </View>
                       </View>
                       <View style={{ backgroundColor: 'white', borderRadius: 20, display : "flex", alignItems : 'center'}}>
                           <View>
                               <TouchableOpacity onPress={() => this.setState({ isFlashOn: !this.state.isFlashOn })} style={{padding : 10}}>
                                   <Text style={{fontWeight : 'bold'}}>
                                       {this.state.isFlashOn ? ("Flash OFF") : ("Flash ON")}
                                   </Text>
                               </TouchableOpacity>
                           </View>
                       </View>

                       
                   </View>
               }
               bottomViewStyle={{ backgroundColor: '#F16A3C', height : 150, position : 'absolute', bottom : 0}}
              
           />
       )
   }
}