import React from 'react';
import { loggingIn } from '../actions/login';
import { addingNotes } from '../actions/notetaking';
import { connect } from 'react-redux';
import {Button, Form} from 'react-bootstrap';


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
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
        console.log(this.state)
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
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
                        this.props.addingNotes(userInfo.categorized_notes)
                        this.props.history.push('/notes')
                    }
                })
    }

    render(){
        console.log(this.state)
        return (
            <div>
                {this.state.error ? <h1>{this.state.error}</h1>: null}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUsername">
                    <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.handleInput} value={this.state.username}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                    <Form.Control name="password" type="password" placeholder="Enter password" onChange={this.handleInput} value={this.state.password}/>
                    </Form.Group>
                    {/* <input name='username' placeholder='username' onChange={this.handleInput} value={this.state.username}></input> */}
                    {/* <input type='password' name='password' placeholder='password' onChange={this.handleInput} value={this.state.password}></input> */}
                    <Button variant="outline-dark" type="submit" size="lg">Log In</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loggingIn, addingNotes
}

export default connect(null, mapDispatchToProps)(Login)