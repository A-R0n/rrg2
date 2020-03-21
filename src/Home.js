import React from 'react';
import app from './base';
import './Home.css';


const Home = (props) => {
    const signOut = () => {
    app.auth().signOut().then(()=>{
        window.location = "/login";
    }).catch((error)=>{
        console.log(`an error: ${error} - happened signing user out`);
    })
}

var user = app.auth().currentUser;

if(user) {
    console.log(user);
    user.updateProfile({
        displayName: "Ron"
    });
    user.updateProfile({
        photoURL: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3059318.png"
    });
}

    return(
        <div>
            <header className="header">
                <h1>Home</h1>
                <div className="header-person">
                <p>Hi {user && user.displayName}</p>
                <button onClick={signOut}>Sign Out</button>
                </div>
            </header>
            <img src={user && user.photoURL} id="avi"></img>
        </div>
    );
};

export default Home;