import { AsyncStorage } from 'react-native';
import { useEffect,useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Home from '../src/screens/Home';
import Intro from '../src/components/Intro/Intro'
import SearchInput from '../src/components/SearchInput/SearchInput'
import Login from '../src/screens/Login'
import Profile from '../src/screens/Profile';
import AccountInformation from '../src/screens/AccountInformation';
import MyFoods from '../src/screens/MyFoods';
import Food from '../src/screens/Food';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabBarIcon from '../src/components/Icon/TabBarIcon';
import { isArgumentPlaceholder } from '@babel/types';
import { createStackNavigator } from '@react-navigation/stack';

const BottomTab = createBottomTabNavigator();
const Tab = createStackNavigator()

function ProfileNavigator() {
  return (
    <Tab.Navigator initialRouteName='Profile' screenOptions={{headerShown: false}} >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="AccountInformation" component={AccountInformation} options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: "Account Information"
      }} />
      <Tab.Screen name="MyFoods" component={MyFoods} options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: "My Foods"
      }} />

      <Tab.Screen name="Food" component={Food} options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitle: "Food"
      }} />
    </Tab.Navigator>
  );
}

export default function Navigator({navigation, route}) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const [loginAuth, setLoginAuth] = useState(0)
  useEffect( async() => {
    // Local storage codes will come here

    setLoginAuth(await AsyncStorage.getItem('loginAuth'))
  })
  
  return (
      <BottomTab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
           title: 'Home',
           tabBarActiveTintColor:'#ff3f34',
           tabBarInactiveTintColor:'#a0a0a0',
           tabBarShowLabel: false,
           tabBarIcon: (focused) => <TabBarIcon
              name={focused.focused ? 'home' : 'home-outline'}
              focused={focused}
              iconStyle={{marginRight: 0}}
            />
          }}
        />
        <BottomTab.Screen
          name="Category"
          component={SearchInput}
          options={{
            title: 'Category',
            tabBarActiveTintColor:'#ff3f34',
            tabBarInactiveTintColor:'#a0a0a0',
            tabBarShowLabel: false,
            tabBarIcon: (focused) => <TabBarIcon
              name="menu"
              focused={focused}
              iconStyle={{marginRight: 0}}
            />
          }
        }
        />
        <BottomTab.Screen
          name="Favorite"
          component={Intro}
          options={{
            title: 'Favorite',
            tabBarActiveTintColor:'#ff3f34',
            tabBarInactiveTintColor:'#a0a0a0',
            tabBarShowLabel: false,
            tabBarIcon: (focused) => <TabBarIcon
              name={focused.focused ? 'star' : 'star-outline'}
              focused={focused}
              iconStyle={{marginRight: 0}}
            />
          }}
        />
        {console.log(loginAuth)}
        {
          loginAuth == '0' ?
            <BottomTab.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',  
              tabBarActiveTintColor:'#ff3f34',
              tabBarInactiveTintColor:'#a0a0a0',
              tabBarShowLabel: false,
              tabBarIcon: (focused) => 
              {
              return <TabBarIcon
                name={focused.focused ? 'account-circle' : 'account-circle-outline'}
                focused={focused}
                iconStyle={{marginRight: 0}}
              />}
            }}
          />
          :
          <BottomTab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            title: 'Profile',  
            tabBarActiveTintColor:'#ff3f34',
            tabBarInactiveTintColor:'#a0a0a0',
            tabBarShowLabel: false,
            tabBarIcon: (focused) => 
            {
            return <TabBarIcon
              name={focused.focused ? 'account-tie' : 'account-tie-outline'}
              focused={focused}
              iconStyle={{marginRight: 0}}
            />}
          }}
        />
        }
        
      </BottomTab.Navigator>
  );
}
