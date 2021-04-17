import React from 'react';
// import axios from 'axios';
// import { navigate } from '@reach/router';

const DeleteButton = (props) => {
    // const [ songId, setSongId ] = props._id;
    const { _id, deleteSongFunc } = props

    return (
        <button className="deleteBtn" onClick={ () => deleteSongFunc(_id) }>Delete</button>
    )
}

export default DeleteButton;
