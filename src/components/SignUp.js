import React from 'react';
import { signingUp } from '../actions/login';
import { connect } from 'react-redux';
import {Button, Form, Container} from 'react-bootstrap';


class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmedPassword: '',
            error: null
        }
    }

    handleInput = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        if(this.state.password === this.state.confirmedPassword){
            console.log(this.state)
            const reqObj = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            }
            fetch('http://localhost:3000/users', reqObj)
                .then(response => response.json())
                    .then(userInfo => {
                        if (userInfo.error){
                            this.setState({
                                error: userInfo.error
                            })
                        } else{
                            this.props.loggingIn(userInfo)
                            this.props.history.push('/dashboard')
                        }
                    })
        } else {
            this.setState({
                ...this.state,
                error: 'Please make sure passwords match.'
            })
        }
       
    }

    render(){
        console.log(this.props)
        return (
            <div>
                {this.state.error ? <h1>{this.state.error}</h1>: null}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUsername">
                    <Form.Control name='username' placeholder='Enter username' onChange={this.handleInput} value={this.state.username}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">

                    <Form.Control type='password' name='password' placeholder='Enter password' onChange={this.handleInput} value={this.state.password}/>
                    </Form.Group>
                    
                    <Form.Group controlId="formConfirmPassword">
                    <Form.Control type='password' name='confirmedPassword' placeholder='Confirm password' onChange={this.handleInput} value={this.state.confirmedPassword}/>
                    </Form.Group>

                    <Button variant="outline-dark" type="submit" className="btn btn-default">Sign Up</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signingUp
}

export default connect(null, mapDispatchToProps)(SignUp)