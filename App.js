/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import firebase from 'firebase';

import {Header, Button, Spinner, CardSection, Card} from "./src/components/common"
import LoginForm from './src/components/LoginForm';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    state = {loggedIn: null}

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBTqsz_oBbWWUXbo0ruSSLJsH5Wtx9jFrc",
            authDomain: "authentication-56191.firebaseapp.com",
            databaseURL: "https://authentication-56191.firebaseio.com",
            projectId: "authentication-56191",
            storageBucket: "authentication-56191.appspot.com",
            messagingSenderId: "505749499066"
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({loggedIn: true});

            }
            else {
                this.setState({loggedIn: false})
            }
        })
    }

    renderContent = () => {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out </Button>
                        </CardSection>
                    </Card>
                )

            case false:
                return <LoginForm/>
            default:
                return (
                    <Card>
                        <CardSection>
                            <Spinner size="large"/>
                        </CardSection>
                    </Card>
                )

        }

    }


    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
