import React, { Component } from "react";
import {View} from "react-native";
import Video from 'react-native-video';
import styles from "./Intro.scss";
const quickFoodVideo = require('./../../videos/bg.mp4');
export default class Intro extends Component {
    render(){
        return(
            <View style={styles.bgView}>
                <Video
                    source={quickFoodVideo}
                    style={styles.backgroundVideo}
                    muted={true}
                    repeat={true}
                    resizeMode={"cover"}
                    ignoreSilentSwitch={"obey"}
                />
            </View>
        )
    }
  }
