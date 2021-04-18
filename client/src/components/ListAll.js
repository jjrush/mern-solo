import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

const ListAll = (props) => {
    const [ allSongs, setAllSongs ] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/karaoke")
        .then((res) => {
            console.log(res.data);
            setAllSongs(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const deleteSong = (songId) => {
        axios.delete(`http://localhost:8000/api/karaoke/${ songId }`)
        .then((res) => {
            console.log(res.data);
            setAllSongs(allSongs.filter((songElement) => songElement._id !== songId ))
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
        <table>
            <thead>
                <th>{/* date here*/}</th>
            </thead>
            <tbody>
            {
                allSongs.map((song, index) => (
                <tr key={index}>
                    <td>
                    <Link to={ `/karaoke/${song._id}` } >{ song.title }</Link>
                    </td>
                    <td>
                    <Link to={ `/karaoke/${song._id}/edit` } ><button>Edit</button></Link>
                    <DeleteButton _id={ song._id } deleteSongFunc={ deleteSong } />
                    {/* <button onClick={ () => deleteSong(song._id) }>Delete</button> */}
                    </td>
                </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    )
};

export default ListAll;
