import React from 'react';
import NoteCard from '../components/NoteCard'
import notesByCategory from '../selectors/index'
import { connect } from 'react-redux';
import { Container, Row} from 'react-bootstrap';



class NotesContainer extends React.Component{

    findCategoryName = note =>{
        let found = this.props.categories.find(category => category.id === note.category_id)
        return found.name
    }

    render(){
        return (
            <Container>
                <Row lg={3}>
                {this.props.notes.map(note =>{
                    return <NoteCard key={note.id} note={note} categoryName={this.findCategoryName}/>
                })}
                </Row>
            </Container>

        )
    }
}

const mapStateToProps = state =>{
    return {userId: state.login.id, notes: notesByCategory(state), categories: state.login.unique_categories}
}

export default connect(mapStateToProps,null)(NotesContainer)