import React from 'react';
import { loggingOut } from '../actions/login';
import { newFilter } from '../actions/category';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {Button, Navbar, Nav, NavDropdown} from 'react-bootstrap';


const Navigation = (props) =>{
    console.log(props)
    const handleLogOut = () =>{
        props.loggingOut()
        props.urlInfo.push(`/login`)
    }

    const filterId = (event) =>{
        console.log(event.target.id)
        props.newFilter(event.target.id)
    }


    return (
        <Navbar sticky="top" className="justify-content-end">
            <Navbar.Brand>Flatnote</Navbar.Brand>
            {props.urlInfo.location.pathname.includes("view") || props.urlInfo.location.pathname.includes("new") || props.urlInfo.location.pathname.includes("edit")? <Nav.Item><Link to={`/notes`}>All Notes</Link></Nav.Item> : null}
            <Nav.Item>
                <Link to={`/new`}>New Note</Link>
            </Nav.Item>
            <Nav.Item className="mr-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
                {props.categories.map((category, index)=>{ 
                    return <NavDropdown.Item  key={category.id} id={category.id} onClick={filterId}>{category.name}</NavDropdown.Item>
                })}
            <NavDropdown.Item id='all' onClick={filterId}>All Notes</NavDropdown.Item> 
            </NavDropdown>
            </Nav.Item>
            <Nav.Item>
                <Button variant="outline-light" onClick={handleLogOut}>Log Out</Button>
            </Nav.Item>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {categories: state.login.unique_categories}
}

const mapDispatchToProps = {
    loggingOut,
    newFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)