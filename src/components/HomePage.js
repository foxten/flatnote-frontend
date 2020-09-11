import React from 'react';
import Button from 'react-bootstrap/Button';


class HomePage extends React.Component{
  
    handleClick=(event)=>{
        if(event.target.name === 'login'){
            this.props.history.push('/login')
        } else {
            this.props.history.push('/signup')
        }
    }

    render(){
        return(
            <div>
                <h1>Flatnote</h1>
                <Button variant="outline-dark" name='login' onClick={this.handleClick} size="lg" block>Log In</Button>
                <Button variant="outline-dark" name='signup' onClick={this.handleClick} size="lg" block>Sign Up</Button>
            </div>
        )
    }
}

export default HomePage