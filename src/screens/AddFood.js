import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  Alert,
  AsyncStorage,
  Appearance
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SliderBox } from "react-native-image-slider-box";

import styles from '../style/AddFood.scss';

import ImagePicker from 'react-native-image-crop-picker';

export default class AddFood extends Component {

    constructor (props) {
      super(props);
      this.state = {
        images: []
      }
    }

    openImagePicker = () => {
      ImagePicker.openPicker({
        multiple: true
      }).then(res=> {
        this.setState({images: res})
        console.log(res)
      })
    }
    
    previewImages=()=> {
      Array.prototype.map.call(this.state.images, image => {
        console.log(image.filename)
        return <Text>{image.filename}</Text>
      })
    }

    componentDidMount = async() => {
       
    }
   
    render() {
      return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addFoodImageTO} >
              <View style={styles.addFoodImageView}>
                <MaterialCommunityIcons name='food-steak'
                          size = { 120 }
                          style = {styles.addFoodImageIcon}
                          color = '#CCC'/>
                <Text style={styles.addFoodImageTitle}>
                  Tap to upload image(s)
                </Text>
              </View>
            </TouchableOpacity>
            <Text>{this.state.images.length}</Text>
        </View>
      );
    }
  }
