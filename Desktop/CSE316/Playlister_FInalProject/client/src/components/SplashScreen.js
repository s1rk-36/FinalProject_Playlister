import { Button, DialogContent, Typography } from "@mui/material";
import Logo from "./Screen_Shot_2022-11-08_at_5.00.49_PM-removebg-preview (1).png";
import Copyright from './Copyright';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../auth'


export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    const handleGuest = (event) => {
        event.preventDefault();
        auth.continueAsGuest();
    }

    return (
        <div id="splash-screen">
            <Typography variant="h3" align="center">WELCOME TO</Typography>
            <img style={{verticalAlign: "top"}} alt="logo" src={Logo} />
            <Typography>Ever wanted to group your favorite music in one place AND be able to play it from that same place? Playlister does just that and more. You will be able to search playlists that others have published as well as comment on them. Bonding over the same taste in music has never been easier!</Typography>
            <p></p>
            <Typography>TO GET STARTED SELECT AN OPTION BELOW:</Typography>
            <div id="button-bar">
                <Button id="splash-screen-button-log-in" component={Link} to='/login/'>Log In</Button>
                <Button id="splash-screen-button-create-account" component={Link} to='/register/'>Create Accout</Button>
                <Button id="splash-screen-button-guest" onClick={handleGuest}>Continue as Guest</Button>
            </div>
            <Copyright sx={{position: "absolute", bottom: "0", right: "0", padding: "10px"}} />
        </div>
    )
}