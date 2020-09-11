export default function notes (state=null, action){
    let index;

    switch(action.type){
        case 'ADD_NOTES':
            return action.notes;

        case 'NEW_NOTE':
            return [...state, action.note]

        case 'EDIT_NOTE':
            index = state.findIndex(note => note.id === action.note.id);
            state.splice(index, 1, action.note)
            return state;

        case 'DELETE_NOTE':
            return state.filter(note => note.id !== action.noteId);

        default:
            return state
    }
}