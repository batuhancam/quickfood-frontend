import React, { Component, forceUpdate } from "react";
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
  Appearance,
  TouchableOpacityBase
} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/AddFood.scss';
import { SliderBox } from "react-native-image-slider-box";
export default class AddFood extends Component {

    constructor (props) {
      super(props);
      this.state = {
        imagePaths: [],
        imagesAWS: [],
        navigated: false
      }
    }

    openImagePicker = async () => {
      const userID = await AsyncStorage.getItem('userID')
      let imageList = [], imagesAWS = []
      ImagePicker.openPicker({
        multiple:true,
        waitAnimationEnd: false,
        includeExif: true,
        forceJpg: true,
        compressImageQuality: 0.8,
        maxFiles: 5,
        mediaType: 'photo',
        includeBase64: true
      }).then(res => {
        res.map((image, index) => {
          console.log(index)
          imageList.push(image.path)
          imagesAWS.push({
            name: userID +"-"+index+"-"+image.filename,
            type: image.mime,
            uri: image.sourceURL
          })
        })
        this.setState({imagePaths: imageList, imagesAWS: imagesAWS})
      });
    
    }
    deleteSelectedImages = () => {
      Alert.alert('Delete Selected Images', `Are you sure you want to delete all selected images?`,[
        {text: 'Yes', onPress: async () => {
           this.setState({imagePaths: []})
        },
        style: 'cancel'
        
    },
    {text: "Cancel", onPress: () => {console.log('alert box closed')}}
    ]);
    }
    nextButton = () => {
      if(this.state.imagesAWS.length>0)
      this.props.navigation.navigate('Add Title and Description', {imagesAWS: this.state.imagesAWS})
      else{
        this.setState({imageAWS: 'null'})
        this.props.navigation.navigate('Add Title and Description', {imagesAWS: this.state.imagesAWS})
      }
    }
    componentDidMount = () => {
      const { navigation } = this.props;

      this.focusListener = navigation.addListener('focus', () => {
        this.setState({imagePaths: [], imageAWS: []});
        if(this?.props?.route?.params?.navigatedFrom == 1 && this.state.navigated === false){
          this.setState({navigated: true}) 
          navigation.navigate('Profile', {
            screen: 'MyFoods',
            params: { name: this.props.route.params.name },
          });
          
          // navigation.navigate('MyFoods', {name: this.props.route.params.name})
        }
      })
      
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
                    Tap to upload image(s) - Maximum 5
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
                      <Text style={styles.deleteSelectedImagesTitle}>Delete Selected Images</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                  
              }
            
              <TouchableOpacity style={styles.nextButtonTO} onPress={this.nextButton}>
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
