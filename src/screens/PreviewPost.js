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
  Appearance,
} from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../style/PreviewPost.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HTMLView from 'react-native-htmlview';
import {RNS3} from 'react-native-aws3'
export default class PreviewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
        userID: '',
        fullName: '',
        food: {},
        images: [],
        isLiked: false
    }
}
    componentDidMount = async () => {
        
    const userID = await AsyncStorage.getItem('userID')

    this.setState({userID: userID})
    
    const user = await fetch('http://localhost:3000/users/getByUserID',{
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        userID: userID
      })
    }).then(res => res.json());

    console.log(user)

    this.setState({fullName: user.userFullName})

    const images = this.props.route.params.imagesAWS

    images.map(image => {
      this.setState({images: [...this.state.images, image.uri]})
    })
    console.log(this.state.images)

    }
    nameGenerator = (name) => {
        name = name.replace(/\s+/g, '-').toLowerCase();
        name = name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'-');
        return name
    }

    uploadAWS = () => {

        const imageAWS = this.props.route.params.imagesAWS

        console.log(imageAWS[0])
        const config = {
            keyPrefix: 's3/',
            bucket: 'quickfoodimages',
            region: 'eu-central-1',
            accessKey: 'AKIA5YWW7CKE5N3YBJL5',
            secretKey: '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',
            successActionStatus: 201
        }

        imageAWS.map((image, index) => {
            image.name = this.nameGenerator(this.props.route.params.foodTitle)
            image.name = this.state.userID + "-" + image.name + "-" + index
            
            RNS3.put(image, config).then(res=> {
                console.log(res)
            })
        })
    }


    previousButton = () => {
        this.props.navigation.goBack()
    }


    render(){
      const {fullName} = this.state
        return (
            <View style={styles.container}>
                <ScrollView style={styles.foods}>
                  <SliderBox 
                    images={this.state.images}
                    sliderBoxHeight={300}
                    disableOnPress={true}
                    dotColor="#ff3f34"
                    inactiveDotColor="#90A4AE" />
    
                    <View style={styles.foodHeader}>
                      <View style={styles.foodTitleView}>
                        <Text style={styles.foodTitle}>{this.props.route.params.foodTitle} by {fullName}</Text>
                      </View>
                      
                    </View>
                    <View style={styles.foodDescriptionView}>
                    <HTMLView
                        value={this.props.route.params.foodDesc}
                    />  
                    </View>
                </ScrollView>
            </View>
          );
        }
}

