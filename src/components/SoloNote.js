import React from 'react';
import { connect } from 'react-redux';
import {Button, Card} from 'react-bootstrap';


const SoloNote = (props) => {
    console.log(props)
    const noteId = parseInt(props.location.pathname.split('/').pop())
    const foundNote = props.notes.find(note => note.id === noteId)
    console.log(foundNote)

    const handleClick = () => {
        props.history.push(`/edit/${foundNote.id}`)
    }
    
    return (
        <Card>
            <h5>Subject: {foundNote.subject}</h5>
            <p>Created: {new Date(foundNote.created_at).toDateString()}</p>
            <p>Content: {foundNote.content}</p>
            <p>Public or Private: {foundNote.shareable === true ? "Public Note" : "Private Note"} </p>
            <Button variant="outline-dark" onClick={handleClick}>Edit/Delete Note</Button><br></br>
        </Card>
    )
}


const mapStateToProps = state =>{
    return {notes: state.notes}
}

export default connect(mapStateToProps, null)(SoloNote)