import React, {Component} from 'react';
import firebase from 'firebase';
import {Button, Card, CardSection, Input, Spinner} from "./common"
import {Text} from 'react-native'

class LoginForm extends Component {
    state = {email: '', password: '', error: '', loading: false};


    onButtonPress = () => {
        const {email, password} = this.state;

        this.setState({error: '', loading: true})
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLogginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLogginSuccess.bind(this))
                    .catch(this.onLogginFail.bind(this))
            })
    }
    onLogginFail = () => {
        this.setState({error: 'Authenetication Failed', loading: false})
    }
    onLogginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    renderButton = () => {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        )
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email: "
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password: "
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                    />
                </CardSection>
                <Text style={styles.errorStyles}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>


            </Card>
        )
    }
}

const styles = {
    errorStyles: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}
export default LoginForm;