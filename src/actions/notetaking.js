export const addingNotes = (notes) =>{
    return {
        type: 'ADD_NOTES',
        notes: notes
    }
}

export const newNote = (note) =>{
    return{
        type: 'NEW_NOTE',
        note
    }
}

export const editNote = (note) =>{
    return {
        type: 'EDIT_NOTE',
        note
    }
}

export const deleteNote = (noteId) =>{
    return {
        type: 'DELETE_NOTE',
        noteId
    }
}
