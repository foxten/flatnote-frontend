import React from 'react';
import { connect } from 'react-redux';
import { editNote } from "../actions/notetaking";
import { deleteNote } from "../actions/notetaking";


class EditNote extends React.Component{
    constructor(){
        super()
        this.state={
            subject: '',
            content: ''
        }
    }

    componentDidMount(){
        const noteId = parseInt(this.props.location.pathname.split('/').pop())
        const foundNote = this.props.notes.find(note => note.id === noteId)
        this.setState({
            subject: foundNote.subject,
            content: foundNote.content
        })
    }
    
    handleInput = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        const id = event.target.id
        const reqObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        fetch(`http://localhost:3000/notes/${id}`, reqObj)
            .then(response => response.json())
                .then(updatedNote => {
                    this.props.editNote(updatedNote)
                    this.props.history.push(`/view/${id}`)
                })

    }

    handleDelete = event =>{
        console.log(event.target.id)
        const reqObj = { method: 'DELETE'}
        fetch(`http://localhost:3000/notes/${event.target.id}`, reqObj)
            .then(response => response.json())
                .then(deleted => {
                    this.props.deleteNote(deleted.id)
                    this.props.history.push('/notes')
                })
    }

    render(){
        return (
            <div>
                <form id={parseInt(this.props.location.pathname.split('/').pop())} onSubmit={this.handleSubmit}>
                    <label>Subject:</label><input name='subject' onChange={this.handleInput} value={this.state.subject}/><br></br>
                    <label>Content:</label><textarea name='content' onChange={this.handleInput} value={this.state.content}/><br></br>
                    <button type='submit'>Update Note</button>
                </form>
                <button id={parseInt(this.props.location.pathname.split('/').pop())} onClick={this.handleDelete}>Delete Note</button>
            </div>
            
        )
    }
}

const mapStateToProps = state =>{
    return {notes: state.notes}
}

const mapDispatchToProps = {
    editNote, deleteNote
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)