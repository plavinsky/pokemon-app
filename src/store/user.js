import { createSlice } from "@reduxjs/toolkit";
import { firebaseConfig } from "../services/firebase";


export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            isLoading: true,
        }),
        updateUser: (state ,action) => ({
            isLoading: false,
            data: action.payload,
        }),
        removeUser: () => ({
            isLoading: false,
            data: {},
        })
    }
});


export const userActions = slice.actions;

export const selectUserIsLoading = state => state.user.isLoading;
export const selectUser = state => state.user?.data;
export const selectLocalID = state => state.user.data?.localId;

export const getUserAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken)
    {
        dispatch(userActions.fetchUser());
        const userResp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`, {
            method: 'POST',
            body: JSON.stringify({idToken})
            }).then(res => res.json());
        
        console.log("userResp", userResp);
        if (userResp.hasOwnProperty('error')) {
            localStorage.removeItem('idToken');
            dispatch(userActions.removeUser());
        }
        else {
            dispatch(userActions.updateUser(userResp?.users[0]));
            localStorage.setItem('localId', userResp?.users[0]?.localId);
        }

    }
    else{
        dispatch(userActions.removeUser())
    }



    
}

export const getUser = (id) => {
    return async (dispatch, getState) => {
         const currentState= getState().user;
        console.log("fromUser:", currentState) 
    };
  };

export default slice.reducer;

