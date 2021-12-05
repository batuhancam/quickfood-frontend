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
import styles from '../style/Categories.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";
import BouncyCheckboxGroup, {
    ICheckboxButton,
  } from "react-native-bouncy-checkbox-group";

export default class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {
        foodCategories: [],
        categoryID: ''
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
    
    return  <>
        <View
        style={{
            marginTop: 5,
            marginLeft: 10,
            justifyContent: "center",
        }}
        >
        {
            Array.prototype.map.call(this.state.foodCategories, category => {
                return <TouchableOpacity key={category._id} style={styles.category} onPress={() => {this.handleCategoryChoose(category._id, category.CategoryName)}}>
                <Text style={styles.categoryTitle}>{category.CategoryName}</Text>
            </TouchableOpacity>
            })
        }
        </View>
    </>
}

handleCategoryChoose = (id, name) => {
    this.props.navigation.navigate('Show Foods', {categoryID: id, categoryName: name});
}

render(){
        return(
            <View style={styles.container}>
               <View>
                   {this.renderCategories()}
               </View>
               
            </View>
        )
    }
}