// import React from 'react';

// const SignUp = () =>{
//     return (
//         <h1> Testing Sign Up Route</h1>
//     )
// }

// export default SignUp

import React from 'react';
import { signingUp } from '../actions/login'
import { connect } from 'react-redux';

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
                <form onSubmit={this.handleSubmit}>
                    <input name='username' placeholder='username' onChange={this.handleInput} value={this.state.username}></input>
                    <input type='password' name='password' placeholder='password' onChange={this.handleInput} value={this.state.password}></input>
                    <input type='password' name='confirmedPassword' placeholder='confirm password' onChange={this.handleInput} value={this.state.confirmedPassword}></input>
                    <button type="submit" className="btn btn-default">Sign Up</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signingUp
}

export default connect(null, mapDispatchToProps)(SignUp)