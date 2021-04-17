import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client';

const New = (props) => {
    const [ socket ] = useState( () => io(":8000") )

    const [ licensed, setLicenced ] = useState(true);
    const [ title, setTitle ] = useState("");
    const [ artist, setArtist ] = useState("");
    const [ albumArtUrl, setAlbumArtUrl ] = useState("");
    const [ videoUrl, setVideoUrl ] = useState("");
    const [ genre, setGenre ] = useState("Rap");
    const [ year, setYear ] = useState("");
    const [ errs, setErrs ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/karaoke", {
        licensed: licensed,
        title: title,
        artist: artist,
        albumArtUrl: albumArtUrl,
        videoUrl: videoUrl,
        // if the key and the value use the same name, you can skip the "key: "
        genre,
        year,
        })
        .then((res) => {
            if(res.data.errors) {
            console.log(res.data.errors);
            setErrs(res.data.errors);
            }
            else {
            console.log(res.data)

            // notify the server about a new song
            //    the server will notify everyone that is listening
            socket.emit("new_song_added", res.data);

            // disconnect the socket before leaving
            socket.disconnect();

            navigate("/karaoke");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
        <h1>New Song</h1>
        <form onSubmit={submitHandler}>
            <div>
            <input type="checkbox"
                name="licensed"
                checked={licensed}
                onChange={ () => setLicenced( !licensed ) }
                />
            <label>Is Licensed?</label>
            </div>
            <div>
            <label>Title: </label>
            <input type="text"
                name="title"
                value={title}
                onChange={ (e) => setTitle( e.target.value ) }
                />
            {
                errs.title ?
                <span className="error-text">{errs.title.message}</span>
                : null
            }
            </div>
            <div>
            <label>Artist: </label>
            <input type="text"
                name="artist"
                value={artist}
                onChange={ (e) => setArtist( e.target.value ) }
                />
            {
                errs.artist ?
                <span className="error-text">{errs.artist.message}</span>
                : null
            }
            </div>
            <div>
            <label>Album Art URL: </label>
            <input type="text"
                name="albumArtUrl"
                value={albumArtUrl}
                onChange={ (e) => setAlbumArtUrl( e.target.value ) }
                />
            {
                errs.albumArtUrl ?
                <span className="error-text">{errs.albumArtUrl.message}</span>
                : null
            }
            </div>
            <div>
            <label>Video URL: </label>
            <input type="text"
                name="videoUrl"
                value={videoUrl}
                onChange={ (e) => setVideoUrl( e.target.value ) }
                />
            {
                errs.videoUrl ?
                <span className="error-text">{errs.videoUrl.message}</span>
                : null
            }
            </div>
            <div>
            {/* enum: [ "Pop", "Country", "Hip Hop", "Jazz", "Rap", "Classical", "Techno", "Gospel", "Rock" ], */}
            <label>Genre: </label>
            <select
                name="genre"
                value={ genre }
                onChange={ (e) => setGenre(e.target.value)}
                >
                <option value="Pop">Pop</option>
                <option value="Country">Country</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Jazz">Jazz</option>
                <option value="Rap">Rap</option>
                <option value="Classical">Classical</option>
                <option value="Techno">Techno</option>
                <option value="Gospel">Gospel</option>
                <option value="Rock">Rock</option>
                </select>
            </div>
            <div>
            <label>Year: </label>
            <input type="number"
                name="year"
                min="1930"
                value={year}
                onChange={ (e) => setYear( e.target.value ) }
                />
            {
                errs.year ?
                <span className="error-text">{errs.year.message}</span>
                : null
            }
            </div>
            <div>
            <button type="submit">Add Song</button>
            <button onClick={ () => navigate("/karaoke")}>Cancel</button>
            </div>
        </form>
        </div>
    )
};

export default New;
