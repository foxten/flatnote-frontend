import React from 'react';
import { connect } from 'react-redux';
import { newNote } from "../actions/notetaking";



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
                    this.props.history.push('/notes')
                    console.log(brandNewNote)
                })

    }

    render(){
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Subject:</label><input name='subject' onChange={this.handleInput} value={this.state.subject}/><br></br>
                    <label>Content:</label><textarea name='content' onChange={this.handleInput} value={this.state.content}/><br></br>
                    <input type="checkbox" id="shareable" name="shareable" value={false} onChange={this.handleShare}></input>
                    <label> Shareable</label><br></br>
                        <select name="categories" id="categories" onChange={this.handleCategory}>
                            {this.props.categories.map(category =>{
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                        </select>
                    <button type='submit'>Create Note</button>
                </form>
            </div>
            
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