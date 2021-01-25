import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CropView } from 'react-native-image-crop-tools';


class Adminfoodpage extends Component {

    state={
        imagepick : '',
    }

    pickImage = () =>{
        ImagePicker.openPicker({
            width: 900,
            height: 900,
            cropping: true,
            compressImageQuality: 1,
            includeBase64: true
        }).then(image => {
            console.log(image);
            this.setState({
                imagepick: image
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
                imagepick: image
            })
        });
       
    }

    render(){
        return(
            <View>
                <Text>
                    Adminfoodpage
                </Text>
                
               {this.state.imagepick ? 
                    (
                        <View>
                            <Image
                                source={{ uri: `data:${this.state.imagepick.mime};base64,${this.state.imagepick.data}` }}
                                style={{ width: 300, height: 300 }}
                            />
                        </View>
                    ) : null

               }
                <TouchableOpacity onPress={() => this.pickImage()} style={{ backgroundColor: '#999999', height: 40, width: 100 }}>
                    <Text>Import from galery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.captureImage()} style={{ backgroundColor: '#999999', height: 40, width: 100 }}>
                    <Text>Take a Photo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Adminfoodpage;