import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Col} from 'react-bootstrap';


const NoteCard = (props) =>{
    return (
        <Col >
        <Card variant="dark" className="text-center" style={{ width: '20rem', height: '20rem' }} text='dark'>
            <Card.Body>
            <Card.Title>Subject: {props.note.subject}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Created: {new Date(props.note.created_at).toDateString()}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Category: {props.categoryName(props.note)}</Card.Subtitle>
            <Card.Link><Link to={`/view/${props.note.id}`}>View Note</Link></Card.Link>
            {/* <Link to={`/new`}>Add Note</Link> */}
            </Card.Body>
        </Card>
        </Col>
    )
}

const mapStateToProps = state =>{
    return {category: state.login.categories}
}

export default connect(mapStateToProps,null)(NoteCard)
