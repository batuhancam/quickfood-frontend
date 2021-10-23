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
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default class SelectCategories extends Component {
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

previousButton = () => {
    this.props.navigation.goBack()
  }
nextButton = () => {
    this.props.navigation.navigate('Preview Post', {
        imagesAWS: this.props.route.params.imagesAWS,
        foodTitle: this.props.route.params.foodTitle,
        foodDesc: this.props.route.params.foodDesc,
        ingredients: this.props.route.params.ingredients,
        categories: this.state.selectedCategories
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