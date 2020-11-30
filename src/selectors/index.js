import { createSelector } from 'reselect';

const getCategories = state => state.category
const getNotes = state => state.notes


const notesByCategory = createSelector(
    [getCategories, getNotes],
    (category, notes) => {
        // figure out how to incorporate a switch case that's based on the category id as opposed to a specific phrase.
        // look to filterNotes function in Notetaking reducer
        // may be able to just implement that particular action in the selector (try it at some point before finding the actual solution)
           if (category !== 'all'){
                return notes.filter(note => note.category_id === Number(category)); 
           } else {
                return notes;
        }
    }   
)

export default notesByCategory