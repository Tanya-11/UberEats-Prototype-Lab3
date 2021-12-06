import * as ACTIONS from '../actions/actions'



export const roleReducer=(state="", action)=>{
    const {type,payload} = action;
    console.log('in role'+JSON.stringify(payload));
    switch (type) {
        case ACTIONS.ROLE: {
            const { text } = payload
            const status = text.role
            console.log('in role');
            return status
        }
        default:{
            console.log('in role1')
            return state

        }
    }
}
const signUpStatus = {
    text: 'In Progress',
    isSignedUp: false,
}


export const userSignupReducer = (state = {}, action) => {
    // console.log(`reducers${JSON.stringify(action)}`)
    const { type, payload } = action
    switch (type) {
        case ACTIONS.USER_SIGNEDUP_SUCCESS: {
            const { text } = payload
            const status = {
                text,
                isSignedUp: true,
            }
            return status
        }
        case ACTIONS.USER_SIGNEDUP_INPROGRESS:
        case ACTIONS.USER_SIGNEDUP_FAIL: {
            const { text } = payload
            const status = {
                text,
                isSignedUp: false,
            }
            return status
        }
        default:
            return state
    }
}

export const restSignupReducer = (state = {}, action) => {
    // console.log(`reducers${JSON.stringify(action)}`)
    const { type, payload } = action
    switch (type) {
        case ACTIONS.USER_SIGNEDUP_SUCCESS: {
            const { text, user,user_id } = payload
            const status = {
                text: payload.text,
                user,
                user_id,
                isSignedUp: true,
            }
            return status
        }
        case ACTIONS.USER_SIGNEDUP_INPROGRESS:
        case ACTIONS.USER_SIGNEDUP_FAIL: {
            const { text, user } = payload
            const status = {
                text,
                user,
                isSignedUp: false,
            }
            return status
        }
        default:
            return state
    }
}

const loginStatus = {
    text: 'In Progress',
    isLoggedIn: false,
}
// add for login late
export const userLoginReducer = (state = {}, action) => {
    const { type, payload } = action
 console.log(action)
    switch (type) {
        case ACTIONS.USER_LOGGEDIN_SUCCESS: {
            const { token, user,user_id } = payload.text
            const status = {
                token,
                user,
                user_id,
                isLoggedIn: true,
            }
            return status
        }
        case ACTIONS.USER_LOGGEDIN_INPROGRESS:
        case ACTIONS.USER_LOGGEDIN_FAIL: {
            const { token, user,user_id } = payload
            const status = {
                token,
                user,
                user_id,
                isLoggedIn: false,
            }
            return status
        }
        default:
            return state
    }
}
export const restLoginReducer = (state = {}, action) => {
    const { type, payload } = action
    //  console.log(action)
    switch (type) {
        case ACTIONS.RESTAURANT_LOGGEDIN_SUCCESS: {
          
            const { token, user, user_id} = payload.text
            const status = {
                token,
                user,
                isLoggedIn: true,
                user_id
            }
            // console.log(status);

            return status
        }
        case ACTIONS.RESTAURANT_LOGGEDIN_INPROGRESS:
        case ACTIONS.RESTAURANT_LOGGEDIN_FAIL: {
            const { token, user,user_id } = payload.text
            const status = {
                token,
                user,
                isLoggedIn: false,
                user_id
            }
            return status
        }
        default:
            return state
    }
}

const text = {
    text: 0,
    dishId: '',
    restId: '',
}

export const orderCountReducer = (state = [], action) => {
    const { type, payload } = action
    // console.log(action)
    switch (type) {
        case ACTIONS.ORDER_INCREMENT: {
            const { text, dishId, dishName, restId, restName, price } = payload.text
            const orders = state
            state = []
            let found = false
            orders.map((el) => {
                console.log(el)
                if (el.dishId === dishId && el.restId === restId) {
                    console.log(text)
                    el.text += text
                    found = true
                }
            })
            if (found === false) {
                const status = {
                    text,
                    dishId,
                    dishName,
                    restId,
                    restName,
                    price,
                }
                orders.push(status)
            }
            // console.log(orders)
            return state.concat(orders)
        }
        case ACTIONS.ORDER_PLACED: {

            state = []
            return state
        }
        case ACTIONS.ORDER_EDIT: {
            const { text, dishId, dishName, restId, restName, price } = payload.text
            const orders = state
            console.log(payload);
            state = []
            let delete_order = false;
            let index = 0;
            orders.map((el) => {
                console.log(el)
                if (el.dishId === dishId && el.restId === restId) {
                    console.log(text)
                    if(text === 0) {
                        delete_order = true;
                        index = orders.indexOf(el);
                        console.log(index);
                        
                    }
                        el.text = text
                    }
            })
            if(delete_order){
                orders.splice(index,1)
            }
            return state.concat(orders)
        }
        default:
            return state
    }
}

// export const OrderCountReducer = (state = [], action) => {
//     const { type, payload } = action;
//     console.log("type" + JSON.stringify(payload));
//     switch (type) {
//         case ACTIONS.ORDER_INCREMENT:
//         case ACTIONS.ORDER_DECREMENT: {
//             let data = {
//                 dishId: payload.payload,
//                 orderCount: status.orderCount + 1,
//             };
//             console.log(data);
//             let found = false;
//             state.map(el => {
//                 if (el.dishId === data.dishId) {
//                     el.orderCount++;
//                     found = true;
//                 }
//                 else !found
//             })
//             if (!found) {
//                 state.push({
//                     dishId: data.dishId,
//                     orderCount: data.orderCount,
//                 })
//             }
//             //  state.push(data)
//             return state;
//         }
//         default:
//             return state;
//     }
// }

// export const OrderCountReducer = (state = [], action) => {
//     const { type, payload } = action;
//     console.log("action", action);
//     switch (type) {
//         case ACTIONS.ORDER_INCREMENT: {
//             const { orderCount, dishId } = payload.dishItem
//             console.log(payload.dishItem);
//             const status = {
//                 // text: text,
//                 // orderCount: orderCount,
//                 // dishId: dishId,
//             }
//             //  state.push(1);
//             console.log('state', state);
//             //  state = count;
//             return state.concat(status);
//             //return 0;

//         }
//         case ACTIONS.ORDER_DECREMENT: {
//             const { orderCount, dishId } = payload.dishItem
//             //  state = count;
//             const status = {
//                 // text: text,
//                 orderCount: orderCount,
//                 dishId: dishId,
//             }

//             //  state = count;
//             return state.concat(status);;
//         }
//         default:
//             return state;
//     }

// }
