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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/AddFood.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
export default class AddTitleAndDesc extends Component {

    constructor (props) {
      super(props);
      this.state = {
        imagePaths: []
      }
    }
    

    componentDidMount = async() => {
      //this.props.route.params.imagesAWS comin' from AddFood Screen
      
    }
   
    render() {
      return (
        <View style={styles.container}>
            
              {this.state.imagePaths.length == 0 ? 
              <TouchableOpacity style={styles.addFoodImageTO} onPress={this.openImagePicker}>
                <View style={styles.addFoodImageView}>
                  <MaterialCommunityIcons name='food-steak'
                            size = { 120 }
                            style = {styles.addFoodImageIcon}
                            color = '#CCC'/>
                  <Text style={styles.addFoodImageTitle}>
                    Tap to upload imag222e(s)
                  </Text>
                </View>
              </TouchableOpacity>
              :
                <View>
                  <SliderBox 
                  images={this.state.imagePaths}
                  sliderBoxHeight={300}
                  disableOnPress={true}
                  dotColor="#ff3f34"
                  inactiveDotColor="#90A4AE" />
                  <TouchableOpacity style={styles.deleteSelectedImagesTO} onPress={this.deleteSelectedImages}>
                    <View style={styles.deleteSelectedImagesView}>
                      <MaterialCommunityIcons name='trash-can-outline'
                        size = { 25 }
                        style = {styles.deleteSelectedImagesIcon}
                        color = '#FFF'/>
                      <Text style={styles.deleteSelectedImagesTitle}>Delete Sel222ected Images</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                  
              }
            
              <TouchableOpacity style={styles.nextButtonTO}>
                <Text style={styles.nextButtonTitle}>Next</Text>
                <MaterialCommunityIcons name='chevron-right'
                  size = { 25 }
                  style = {styles.nextButtonIcon}
                  color = '#FFF'/>
              </TouchableOpacity>
        </View>
      );
    }
  }
