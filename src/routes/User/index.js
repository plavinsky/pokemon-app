import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectUser, userActions } from '../../store/user';

function displayObject (obj) {
    var jsx = (Object.entries(obj)).map( item => {
        //if (typeof item !== Object)
         return (<p>{item[0]} - {item[1]}</p>);
        // else
        //     displayObject(item);
    });

    console.log("jsx", jsx);
    return jsx;
}

const User = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const user = useSelector(selectUser);
    // console.log("user.keys:", Object.keys(user));
    // console.log("user.entries:", Object.entries(user));


    const handleLogOut = () => {
        dispatch(userActions.removeUser());
        localStorage.removeItem('localId');
        localStorage.removeItem('idToken');
        history.push('/');
    }
    
    return (
        <div>
            {/* {displayObject(user)} */}
            {/* <p>Email: {user.email}</p>
            <p>localId: {user.localId}</p> */}
            <h3>User info:</h3>
            {
                Object.entries(user).map( item => (<p key={item[0]}><h4>{item[0]}:</h4> <h5>{JSON.stringify(item[1])}</h5></p>) )
            }
            <br/>
            <button
                onClick={handleLogOut}>
                Log out</button>
        </div>
    )

    
};

export default User;