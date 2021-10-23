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
import styles from '../style/SelectIngredients.scss';
import { SliderBox } from "react-native-image-slider-box";
import { createIconSetFromFontello } from "react-native-vector-icons";
import {actions, getContentCSS, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import SearchInput from "../components/SearchInput/SearchInput";

export default class SelectIngredients extends Component {
  constructor(props){
    super(props);
    this.ingredients = [
        'Apple',
        'Apple2',
        'Pineapple',
        'Brocoli',
        'Bread',
        'Bread1',
        'Bread2',
        'Bread3',
        'Bread4',
        'Bread5',
        'Water',
        'Wat 2',
        'Soy S2auce',
        'Soy Sauce',
        'Chicken',
        'Pork',
    ];

    this.state = {
        suggestion: [],
        selectedIngredients: [],
        inputValue : "",
        toggle: false,
        cancelToggle: false,
        addToggle: false,
        searchToggle: false
    }
    const toggle = false
    
}
animVal = new Animated.Value(this.toggle ? 1 : 0);

interpolateWidth = this.animVal.interpolate({inputRange:[0,1],outputRange:['90%','108%']})
interpolateHeight = this.animVal.interpolate({inputRange:[0,1],outputRange:['0%','100%']})
interpolateBackgroundColor = this.animVal.interpolate({inputRange:[0,1],outputRange:['white','white']})
interpolatePaddingTop = this.animVal.interpolate({inputRange:[0,1],outputRange:[0,44]})

animatedTransition = Animated.spring(this.animVal,{toValue:1})

toggleSearchBox = () => { 
    this.toggle = true
    this.setState({cancelToggle: true})
    this.animationSearchBox()
}

toggleCancel = () => {
    Keyboard.dismiss()
    this.toggle = false
    this.setState({
        cancelToggle: false,
        addToggle: false,
        inputValue: "",
        suggestion: []
    })

    this.animationSearchBox()
}


animationSearchBox = () => {
    Animated.timing(this.animVal, {
        toValue: this.toggle ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
}


handleClickIngredientElement = (e) => {
    const value = e._dispatchInstances.child.key
    this.setState({inputValue: value, suggestion: []})
}
onTextChanged = (value) => {
    this.setState({inputValue: value})
    this.setState({addToggle: false})
    if(this.state.selectedIngredients.length > 0)
        this.setState({searchToggle: true})
    
    let suggestions = []
    if(value.length > 0){
        const regex = new RegExp(`^${value}`, 'i')
        this.setState({
            addToggle: true,
            searchToggle: false
        })
        suggestions = this.ingredients.sort().filter(v => regex.test(v))
    }
    this.setState({suggestion: suggestions})
}
renderSuggestions = () => {
    const {suggestion} = this.state
    if(suggestion.length === 0){
        return null
    }
    if(suggestion.length === 1){
        return  <ScrollView style={styles.suggestionContainer1} >
        {
            suggestion.map((ingredient, i) => (
                <TouchableOpacity style={(i === suggestion.length - 1 && suggestion.length > 3 ) ? styles.suggestionLastElement : styles.suggestionElement} key={ingredient} onPress={this.handleClickIngredientElement}>
                    <Text  key={ingredient}>{ingredient}</Text>
                </TouchableOpacity>
            ))
        }
    </ScrollView>
    }
    return  <ScrollView style={styles.suggestionContainer} >
    {
        suggestion.map((ingredient, i) => (
            <TouchableOpacity style={(i === suggestion.length - 1 && suggestion.length > 3 ) ? styles.suggestionLastElement : styles.suggestionElement} key={ingredient} onPress={this.handleClickIngredientElement}>
                <Text  key={ingredient}>{ingredient}</Text>
            </TouchableOpacity>
        ))
    }
</ScrollView>
}

addIngredientsHandler = () => {
    const selectedIngredients = this.state.selectedIngredients
    if(this.ingredients.includes(this.state.inputValue) && !selectedIngredients.includes(this.state.inputValue)){
        selectedIngredients.push(this.state.inputValue)
        this.setState({
            ...this.state,
            inputValue: '',
            selectedIngredients: selectedIngredients,
            searchToggle: true,
            addToggle: false
        })
    }else if(!this.ingredients.includes(this.state.inputValue) && this.state.inputValue != ''){
        Alert.alert('Entry Not Found', `I am sorry :( I can not find any ingredient named '${this.state.inputValue}'`,[
            {text: 'Try Again', onPress: () => {console.log('alert box closed')}}
        ])
    }else if(selectedIngredients.includes(this.state.inputValue)){
        Alert.alert('Same Entry!', `You have already added '${this.state.inputValue}' before.`,
        {text: 'Check Again', onPress: () => {console.log('2nd alert box closed')}})
    }
}

displaySelectedIngredients = () => {
    const {selectedIngredients} = this.state
    return <View style={(this.state.cancelToggle == false && this.state.searchToggle == true) ? styles.ingredientDownInput : styles.selectedIngredients} >
                {
                    selectedIngredients.map((ingredient, i) => {
                        return <TouchableOpacity key={ingredient} style={styles.ingredient} onPress={this.deleteIngredientHandler}>
                           
                                <Text key={ingredient} style={styles.ingredientTitle}>{ingredient}</Text>
                                <Image 
                                        style={styles.deleteButton}
                                        source={require('../images/delete.png')}
                                    />    
                            
                            </TouchableOpacity>  
                    })
                    
                }
            
            </View>
}
deleteIngredientHandler = (e) => {
    const {selectedIngredients} = this.state
    const value = e._dispatchInstances.child.child.key

    let deletedIngredients = selectedIngredients

    deletedIngredients = deletedIngredients.filter(ingredient => {
        return ingredient !== value
    })
    if(deletedIngredients.length === 0){
        this.setState({
            ...this.state,
            selectedIngredients: [],
            searchToggle: false
        })
    }else{
        this.setState({
            ...this.state,
            selectedIngredients: deletedIngredients,
            searchToggle: true
        })
    }
    
}

previousButton = () => {
    this.props.navigation.goBack()
}
nextButton = () => {
    this.props.navigation.navigate('Select Categories', {
      imagesAWS: this.props.route.params.imagesAWS,
      foodTitle: this.props.route.params.foodTitle,
      foodDesc: this.props.route.params.foodDesc,
      ingredients: this.state.selectedIngredients
    })
  }

render(){
    return(
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={this.state.cancelToggle ? styles.bgSearchInput: styles.bgSearchInput2}>
          
            <View style={styles.inputView} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View styles={styles.inputContainer}>
                    <Animated.View style={styles.animatedView}>
                        <View style={styles.searchCancelView}>
                            <TextInput  style={styles.inputSearch} 
                                        ref={c => { this.textInput = c}}
                                        onPressIn={this.toggleSearchBox}
                                        placeholder={this.state.selectedIngredients.length>0 ? 'Click search button to see results!' : 'Tell us what you have!'}
                                        value={this.state.inputValue}
                                        onChangeText={this.onTextChanged}
                                        placeholderTextColor='#b1b1b3'
                                    />
                                        
                            <View style={styles.alignButtons}>
                                <TouchableOpacity style={this.state.searchToggle ? styles.searchButtonTO : styles.hide} onPress={this.addIngredientsHandler}>
                                    <Image  
                                            style={styles.searchButton}
                                            source={require('../images/search.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.addToggle ? styles.addButtonTO : styles.hide} onPress={this.addIngredientsHandler}>
                                    <Image  
                                            style={styles.addButton}
                                            source={require('../images/cancel.png')}
                                    />
                                </TouchableOpacity>
                               
                                
                            </View>
                            
                        </View>
                        {this.renderSuggestions()}

                    </Animated.View>

                    
                </View>
                
                </TouchableWithoutFeedback>
                <View style={styles.ingredientView}>
                  {this.displaySelectedIngredients()}
                </View>
            </View>
            <TouchableOpacity style={styles.previousButtonTO} onPress={this.previousButton}>
                <MaterialCommunityIcons name='chevron-left'
                  size = { 25 }
                  style = {styles.previousButtonIcon}
                  color = '#FFF'/>
                <Text style={styles.previousButtonTitle}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButtonTO} onPress={this.nextButton}>
                <Text style={styles.nextButtonTitle}>Next</Text>
                <MaterialCommunityIcons name='chevron-right'
                  size = { 25 }
                  style = {styles.nextButtonIcon}
                  color = '#FFF'/>
              </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
}

