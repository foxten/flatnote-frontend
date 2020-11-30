export default function loggingIn (state=[], action){
    switch(action.type){
        case 'LOGGING_IN' || 'SIGNING_UP':
            return action.user;
        case 'LOGGING_OUT':
            return null;
        default:
            return state;
    }
}