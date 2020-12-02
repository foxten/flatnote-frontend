import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';


const NoteCard = (props) =>{
    return (
        <Col>
            <Card text="light">
                <Card.Header>{new Date(props.note.created_at).toDateString()}</Card.Header>
                <Card.Body>
                <Card.Title>{props.note.subject}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">Category: {props.categoryName(props.note)}</Card.Subtitle>
                </Card.Body>
                <Card.Footer><Link to={`/view/${props.note.id}`}>View Note</Link></Card.Footer>
            </Card>
        </Col>
    )
}

const mapStateToProps = state =>{
    return {category: state.login.categories}
}

export default connect(mapStateToProps,null)(NoteCard)
