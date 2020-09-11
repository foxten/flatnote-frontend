import React from 'react';
import { connect } from 'react-redux';
import {Button, Card, Container} from 'react-bootstrap';
import Navigation from './Navigation';


const SoloNote = (props) => {
    console.log(props)
    const noteId = parseInt(props.location.pathname.split('/').pop())
    const foundNote = props.notes.find(note => note.id === noteId)
    console.log(foundNote)

    const handleClick = () => {
        props.history.push(`/edit/${foundNote.id}`)
    }
    
    const findCategoryName = note =>{
        let found = props.categories.find(category => category.id === note.category_id)
        return found.name
    }

    return (
        <Container>
        <Navigation urlInfo={props.history}/>
        <Card>
            <Card.Body>
            <Card.Title>Subject: {foundNote.subject}</Card.Title>
            <Card.Subtitle><em>Created: {new Date(foundNote.created_at).toDateString()}</em></Card.Subtitle>
            <Card.Text>Content: {foundNote.content} <br></br>
            <em>{foundNote.shareable === true ? "Public Note" : "Private Note"}</em><br></br>
            Category: {findCategoryName(foundNote)}</Card.Text>
            <Button variant="outline-dark" onClick={handleClick}>Edit/Delete Note</Button>
            </Card.Body>
        </Card>
        </Container>

    )
}


const mapStateToProps = state =>{
    return {notes: state.notes, categories: state.login.unique_categories}
}

export default connect(mapStateToProps, null)(SoloNote)