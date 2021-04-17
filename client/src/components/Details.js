import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

const Details = (props) => {
    const [ song, setSong ] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/karaoke/' + props.id)
        .then((res) => {
            console.log(res.data);
            setSong(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        // adding props.id to remove the linter's error saying I need to add props.id
        //    this is NOT required
    }, [ props.id ]);

    const deleteSong = (songId) => {
        axios.delete(`http://localhost:8000/api/karaoke/${ songId }`)
        .then((res) => {
            console.log(res.data);
            console.log("song ID: " + songId);
            // setAllSongs(allSongs.filter((songElement) => songElement._id !== songId ))
            navigate('/karaoke')
        })
        .catch((err) => {
            console.log(err);
        });
    }
    //   {
    //     "licensed": true,
    //     "_id": "605011e4322f6b165ceaa6f8",
    //     "title": "Happy",
    //     "artist": "Parrell Williams",
    //     "albumArtUrl": "https://pyxis.nymag.com/v1/imgs/cdd/755/b8f2b53c1a310c4fbabf6ff552497acd59-18-pharrell-williams.rsquare.w700.jpg",
    //     "videoUrl": "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
    //     "genre": "Pop",
    //     "year": 2014,
    //     "createdAt": "2021-03-16T02:03:16.602Z",
    //     "updatedAt": "2021-03-16T02:03:16.602Z",
    //     "__v": 0
    // }

    return (
        <div>
        <h1>Details component</h1>
        {
            song.albumArtUrl ? 
            <img src={ song.albumArtUrl } alt={song.title} />
            : null
        }
        <table>
            <tr>
                <td>
                    Licensed:
                </td>
                <td>
                    { 
                    song.licensed ? 
                        <span>Yes</span>
                        : <span>No</span>
                    }
                </td>
            </tr>
            <tr>
                <td>
                    Artist:
                </td>
                <td>
                    { song.artist}
                </td>
            </tr>
            <tr>
                <td>
                    Title:
                </td>
                <td>
                    { song.title}
                </td>
            </tr>
            <tr>
                <td>
                    Year:
                </td>
                <td>
                    { song.year}
                </td>
            </tr>
            <tr>
                <td>
                    Genre:
                </td>
                <td>
                    { song.genre }
                </td>
            </tr>
            {
            song.videoUrl ? 
                <tr>
                    <td>
                        Video URL:
                    </td>
                    <td>
                        <a href={ song.videoUrl } target="_blank" rel="noreferrer">Watch the video</a>
                    </td>
                </tr>
                : null
            }
        </table>
        <DeleteButton _id={ song._id } deleteSongFunc={ deleteSong } />
        </div>
    )
};

export default Details;
