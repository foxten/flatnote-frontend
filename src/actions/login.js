export const loggingIn = (user) =>{
    return {
        type: 'LOGGING_IN',
        user
    }
}

export const signingUp = (user) => {
    return {
        type: 'SIGNING_UP',
        user
    }
}


export const loggingOut = () =>{
    return {
        type: 'LOGGING_OUT',
    }
}

