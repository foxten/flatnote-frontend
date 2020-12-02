import React from 'react';
import NotesContainer from '../containers/NotesContainer';
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';


class Dashboard extends React.Component{
    componentDidMount(){
        if (this.props.login === null){
            this.props.history.push('./login')
        }
    }
    
    render(){
        return (
            <Container>
                <Navigation urlInfo={this.props.history}/>
                <NotesContainer />
            </Container>
        )
    }
}

const mapStateToProps = state =>{
    return {login: state.login}
}

export default connect(mapStateToProps, null)(Dashboard)