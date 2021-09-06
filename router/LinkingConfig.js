import * as Linking from 'expo-linking';

export default {
    prefixes: [Linking.makeUrl('/')],
    config: {
        Root: {
            path: 'root',
            screens: {
                Home: 'Home',
                Links: 'links',
                Login: 'Login',
                Signup: 'Sign up'
            },
        },
    },
};