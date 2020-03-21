import React from 'react';
import app from './base';

const Home = () => {
    console.log(app.name);
    return(
        <div>
            <h1>Home</h1>
            <button onClick={()=> app.auth().signOut().then(()=>{
                window.location = "/login";
            }).catch((error)=>{
                console.log(`an error: ${error} - happened signing user out`);
            })}>Sign Out</button>
        </div>
    );
};

export default Home;