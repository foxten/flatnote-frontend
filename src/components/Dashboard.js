import React from 'react';
import NotesContainer from '../containers/NotesContainer';
import Navigation from './Navigation'
import { connect } from 'react-redux';



class Dashboard extends React.Component{
    componentDidMount(){
        if (this.props.login === null){
            this.props.history.push('./login')
        }
    }
    
    render(){
        console.log(this.props)
    return (
        <div>
        <h2>Welcome, {this.props.login.username}</h2>
        <Navigation urlInfo={this.props.history}/>
        <NotesContainer />
        </div>
    )
    }
}

const mapStateToProps = state =>{
    return {login: state.login}
}

export default connect(mapStateToProps, null)(Dashboard)