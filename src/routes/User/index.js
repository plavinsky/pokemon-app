import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user';

function displayObject (obj) {
    var jsx = (Object.keys(obj)).map( item => {
        if (typeof item !== Object)
         return (<p>{obj[item]} - {item}</p>);
        else
            displayObject(item);
    });

    console.log("jsx", jsx);
    return jsx;
}

const User = () => {
    const user = useSelector(selectUser);
    console.log("user", Object.keys(user));
    
    return (
        <>
            {/* {displayObject(user)} */}
            <p>Email: {user.email}</p>
            <p>localId: {user.localId}</p>
        </>
    )

    
};

export default User;