import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import io from 'socket.io-client';

const ListAll = (props) => {
    // this state will never use the setter method - it is set with the initial value
    // const [ socket, setSocket ] = useState(() => io(":8000"));
    const [ socket ] = useState(() => io(":8000"));

    const [ allSongs, setAllSongs ] = useState([]);

    useEffect(() => {
        console.log("inside useEffect for sockets");
        console.log(socket);
        console.log(allSongs);

        // this is a reserved / expected type of event
        socket.on("connect", () => {
        console.log(socket.id);
        });

        // listen for an event about newly added songs
        socket.on("added_song", (data) => {
        console.log("new song added");
        console.log(data);

        // allSong is NOT refreshed AFTER this listener is setup
        console.log(allSongs);

        // https://reactjs.org/docs/hooks-reference.html#functional-updates
        //      If the new state is computed using the previous state, you can pass a function to setState. 
        //      The function will receive the previous value, and return an updated valu
        setAllSongs( (currentValue) => [ data, ...currentValue ] );

        });

        // clean up our resources - "hang up the socket conversation"
        return () => socket.disconnect();

    }, []);

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
            <th>Song Title</th>
            <th>Actions Available</th>
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
