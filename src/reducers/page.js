import { PAGE_LOGIN, PAGE_HOME} from '../constants/PageActionTypes'
// import {drawerMenuOptions} from '../data/data'
const initialPageState = {
        
};


// Page Path
export default function reducer(state = initialPageState, action) {
  	switch (action.type) {
        case PAGE_LOGIN:
            return {...state, path: action.payload}
        case PAGE_HOME:
            return {...state, path: action.payload}
        default:
          return state
    }
}



