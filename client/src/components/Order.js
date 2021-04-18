import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const Order = (props) => {

    const [ licensed, setLicenced ] = useState(true);
    const [ method, setMethod ] = useState("carryout");
    const [ size, setSize ] = useState("");
    const [ albumArtUrl, setAlbumArtUrl ] = useState("");
    const [ videoUrl, setVideoUrl ] = useState("");
    const [ genre, setGenre ] = useState("Rap");
    const [ year, setYear ] = useState("");
    const [ errs, setErrs ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/order", {

        })
        .then((res) => {
            if(res.data.errors) {
                console.log(res.data.errors);
                setErrs(res.data.errors);
            }
            else {
                console.log(res.data)
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
        <h2>Craft-A-Pizza</h2>
        <form onSubmit={submitHandler}>
            <div>
                <label>Method: </label>
                <select name="method">
                    <option value="carryout">Carryout</option>
                    <option value="delivery">Delivery</option>
                    value={method}
                    onChange={ (e) => setMethod( e.target.value ) }
                </select>
            </div>
            <div>
                <label>Size: </label>
                <select name="size">
                    <option value="xlarge">Extra Large</option>
                    <option value="large">Large</option>
                    <option value="medium">Medium</option>
                    <option value="personal">Personal</option>
                    value={size}
                    onChange={ (e) => setMethod( e.target.value ) }
                </select>
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

export default Order;
