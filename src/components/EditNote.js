import React from 'react';
import { connect } from 'react-redux';
import { editNote } from "../actions/notetaking";
import { deleteNote } from "../actions/notetaking";
import Navigation from './Navigation';
import {Button, Form, Container, Row, Col} from 'react-bootstrap';



class EditNote extends React.Component{
    constructor(){
        super()
        this.state={
            subject: '',
            content: '',
            category: null,
            shareable: null
        }
    }

    componentDidMount(){
        const noteId = parseInt(this.props.location.pathname.split('/').pop())
        const foundNote = this.props.notes.find(note => note.id === noteId)
        this.setState({
            subject: foundNote.subject,
            content: foundNote.content,
            category: foundNote.category_id,
            shareable: foundNote.shareable
        })
    }
    
    handleInput = event =>{
        this.setState({
            ...this.state,
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

     handleShare = () =>{
        this.setState({
            ...this.state, 
            shareable: !this.state.shareable
        })
    }

    handleCategory = event =>{
        console.log(event.target.value)
        this.setState({
            ...this.state,
            category_id: event.target.value
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
        console.log(this.state)
        return (
            <Container>
                <Row className="justify-content-end">
                    <Navigation urlInfo={this.props.history}/>
                </Row>
                
                <Form id={parseInt(this.props.location.pathname.split('/').pop())} onSubmit={this.handleSubmit}>
                <Row className="justify-content-md-center">
                        <Col lg={10}>
                            <Form.Group controlId="formSubject">
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control name='subject' type='text' onChange={this.handleInput} value={this.state.subject}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg={10}>
                            <Form.Group controlId="formContent">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control as="textarea" name='content' onChange={this.handleInput} value={this.state.content}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Form.Group controlId="formCategory">
                        <Form.Label>Category:</Form.Label><Form.Control as="select" name="categories" id="categories" value={this.state.category} onChange={this.handleCategory}>
                                {this.props.categories.map(category =>{
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })}
                        </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Form.Group controlId="formShareable">
                        <Form.Check type="checkbox" id="shareable" name="shareable" checked={this.state.shareable} onChange={this.handleShare} label="Shareable"/>
                        </Form.Group>
                    </Row>

                    <Button variant="outline-dark" type="submit" size="lg">Update</Button>
                    <Button variant="outline-dark" id={parseInt(this.props.location.pathname.split('/').pop())} onClick={this.handleDelete} size="lg">Delete Note</Button>
                </Form>
            </Container>
            
        )
    }
}

const mapStateToProps = state =>{
    return {notes: state.notes, categories:state.login.unique_categories}
}

const mapDispatchToProps = {
    editNote, deleteNote
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)