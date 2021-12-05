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
import styles from '../style/SelectCategories.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";
import BouncyCheckboxGroup, {
    ICheckboxButton,
  } from "react-native-bouncy-checkbox-group";

export default class SelectCategories extends Component {
  constructor(props){
    super(props);
    this.state = {
        foodCategories: [],
        selectedCategory: ''
    }
}
componentDidMount = async () => {
    const categories = await fetch('http://localhost:3000/categories', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res=> res.json())
    let foodCategories = []
    categories.map((category, index)=> {
        foodCategories.push({
            id: index,
            text: category.CategoryName,
            fillColor: "#ff3f34",
            unfillColor: "#ffe4e2",
            iconStyle: this._iconStyle("#ff3f34"),
            textStyle: styles.textStyle,
            iconImageStyle: styles.iconImageStyle,
        })
    })
    this.setState({foodCategories: foodCategories})
    
}
 _iconStyle = (borderColor) => ({
    height: 25,
    width: 25,
    borderRadius: 25,
    borderColor: borderColor,
    marginTop: 10,
  });
renderCategories = () => {
    
    return  <>
        <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 24, marginBottom: 5 }}>
            <Text style={{ color: "#a8a8ac", fontWeight: "500", fontSize: 16 }}>
                Please select a category from the options below
            </Text>
        </View>
        <View
        style={{
            marginTop: 5,
            marginLeft: 10,
            justifyContent: "center",
        }}
        >
        <BouncyCheckboxGroup
            data={this.state.foodCategories}
            style={{ flexDirection: "column" }}
            onChange={(selectedItem) => {
                this.setState({selectedCategory: selectedItem.text})
            }}
        />
        </View>
    </>
}

previousButton = () => {
    this.props.navigation.goBack()
  }
nextButton = () => {
    if(this.state.selectedCategory.length <= 0){
        Alert.alert('Warning', `You must select a category for your food!`,[
            {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
          ]);
          return;
    }
    this.props.navigation.navigate('Preview Post', {
        imagesAWS: this.props.route.params.imagesAWS,
        foodTitle: this.props.route.params.foodTitle,
        foodDesc: this.props.route.params.foodDesc,
        ingredients: this.props.route.params.ingredients,
        categories: this.state.selectedCategory
    })
}

render(){
        return(
            <View style={styles.container}>
               <View>
                   {this.renderCategories()}
               </View>
               <TouchableOpacity style={styles.previousButtonTO} onPress={this.previousButton}>
                <MaterialCommunityIcons name='chevron-left'
                  size = { 25 }
                  style = {styles.previousButtonIcon}
                  color = '#FFF'/>
                <Text style={styles.previousButtonTitle}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButtonTO} onPress={this.nextButton}>
                <Text style={styles.nextButtonTitle}>Preview</Text>
                <MaterialCommunityIcons name='chevron-right'
                  size = { 25 }
                  style = {styles.nextButtonIcon}
                  color = '#FFF'/>
              </TouchableOpacity>   
            </View>
        )
    }
}