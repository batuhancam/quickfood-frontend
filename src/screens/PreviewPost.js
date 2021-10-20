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
        foodCategories: [],
        selectedCategories: []
    }
}
componentDidMount = async () => {
    const categories = await fetch('http://localhost:3000/categories', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res=> res.json())
    this.setState({foodCategories: categories})

const userID = await AsyncStorage.getItem('userID')

console.log(this.props.route.params.imagesAWS)
    
}

renderCategories = () => {
    return  <View>
        {
            Array.prototype.map.call(this.state.foodCategories, (category) => {
                const categoryName = category.CategoryName
                
                return <BouncyCheckbox
                    size={25}
                    fillColor="#ff3f34"
                    unfillColor="transparent"
                    text={category.CategoryName}
                    textStyle={{color: '#111'}}
                    iconStyle={{ borderColor: "red" }}
                    onPress={(isChecked) => { 
                        isChecked=!isChecked
                        if(!isChecked){
                            this.setState({
                                selectedCategories: [...this.state.selectedCategories, categoryName] 
                            })
                        }
                        else{
                            this.setState({
                                selectedCategories: this.state.selectedCategories.filter(item => item != categoryName)
                            })
                        }
                     }}
                     
                    style={styles.checkbox}
                    key={category.CategoryName}
                />
            })
        }
    </View>
}

nextButton = () => {
    this.props.navigation.navigate('Preview', {
        imagesAWS: this.props.route.params.imagesAWS,
        foodTitle: this.props.route.params.foodTitle,
        foodDesc: this.props.route.params.foodDesc,
        ingredients: this.props.route.params.ingredients,
        categories: this.state.selectedCategories
    })
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

    imageAWS.map(image => {
        RNS3.put(image, config).then(res=> {
            console.log(res)
        })
    })
   

}

render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.route.params.foodTitle}</Text>
                <Text>{this.props.route.params.ingredients}</Text>
                <HTMLView
                    value={this.props.route.params.foodDesc}
                />      
                <TouchableOpacity onPress={this.uploadAWS}>
                    <Text>UPLOAD</Text>
                </TouchableOpacity>         
            </View>
        )
    }
}