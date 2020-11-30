export default function category (state='all', action){
    switch(action.type){
        case 'NEW_FILTER':
            return action.categoryId;
        default:
            return state;
    }
}