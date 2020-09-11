import React from 'react';
import { connect } from 'react-redux';
import { newNote } from "../actions/notetaking";
import {Button, Form, Container, Row, Col} from 'react-bootstrap';
import Navigation from './Navigation';



class AddNote extends React.Component{
    constructor(){
        super()
        this.state={
            subject: '',
            content: '',
            shareable: false,
            category_id: 1, 
            user_id: null
        }
    }
    
    handleInput = event =>{
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            user_id: this.props.userId
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

    handleSubmit = event =>{
        event.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        fetch(`http://localhost:3000/notes`, reqObj)
            .then(response => response.json())
                .then(brandNewNote => {
                    this.props.newNote(brandNewNote)
                    this.props.history.push(`/view/${brandNewNote.id}`)
                    console.log(brandNewNote)
                })

    }
    
    render(){
        console.log(this.state)
        return (
            <Container>
                <Row className="justify-content-end">
                    <Navigation urlInfo={this.props.history}/>
                </Row>

                <Form onSubmit={this.handleSubmit}>
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
                    <Form.Label>Category:</Form.Label><Form.Control as="select" name="categories" id="categories" onChange={this.handleCategory}>
                            {this.props.categories.map(category =>{
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                    </Form.Control>
                    </Form.Group>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Form.Group controlId="formShareable">
                        <Form.Check type="checkbox" id="shareable" name="shareable" value={false} onChange={this.handleShare} label="Shareable"/>
                        </Form.Group>
                    </Row>

                    <Button variant="outline-dark" type='submit'>Create Note</Button>
                </Form>
            </Container>
            
        )
    }
}

const mapStateToProps = state =>{
    return {userId: state.login.id, categories: state.login.unique_categories}
}

const mapDispatchToProps = {
    newNote
}

export default connect(mapStateToProps,mapDispatchToProps)(AddNote)