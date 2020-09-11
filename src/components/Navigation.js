import React from 'react';
import { loggingOut } from '../actions/login';
import { connect } from 'react-redux'
import {Button, Navbar} from 'react-bootstrap';


const Navigation = (props) =>{
    console.log(props)
    const handleLogOut = () =>{
        props.loggingOut()
        props.urlInfo.push(`/login`)
    }

    const createNewNote = () =>{
        props.urlInfo.push('/new')
    }

    return (
        <Navbar fixed="top">
            <Button onClick={createNewNote}>New Note</Button>
            <Button onClick={handleLogOut}>Log Out</Button>
        </Navbar>
    )
}

const mapDispatchToProps = {
    loggingOut
}

export default connect(null, mapDispatchToProps)(Navigation)