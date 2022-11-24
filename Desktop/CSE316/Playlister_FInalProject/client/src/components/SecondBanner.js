import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';

import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';


export default function SecondBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    if (auth.loggedIn){
    return (
        <Box sx={{ height: "50px"}}>
            <AppBar position="static" sx={{bgcolor: "#0e5584"}}>
            <Box sx={{ display: { xs: 'none', md: 'flex', height: "50px" }, zIndex: "2"}}
            display='flex'>
                        <HomeIcon
                            edge="end"
                            aria-label="home screen view"
                            sx={{fontSize: 45, paddingLeft: 2, color: "black", cursor: "pointer"}}
                        >
                        </HomeIcon>
                        <GroupsIcon
                        aria-label="all lists"
                        sx={{fontSize: 45, paddingLeft: 1, color: "black", cursor: "pointer"}}
                        >
                        </GroupsIcon>
                        <PersonIcon
                        aria-label="owned lists"
                        sx={{fontSize: 45, paddingLeft: 1, color: "black", cursor: "pointer"}}
                        >
                        </PersonIcon>

                        <TextField
                        id="searc-bar" 
                        placeholder='Search'
                        variant="outlined"
                        sx={{bgcolor: "white", width: "800px", marginLeft: 10}}
                        fullWidth="40%"
                        
                        ></TextField> 
    
                        <Typography 
                        variant='h5'
                        marginTop= '10px'
                        align='right'
                        color='black'
                        paddingLeft={23}
                        >SORT BY</Typography>

                        <SortIcon
                        aria-label="owned lists"
                        
                        sx={{fontSize: 45, paddingLeft: 2, color: "black", cursor: "pointer"}}
                        ></SortIcon>
                    </Box>
            </AppBar>
        </Box>
    );
    } else
    return null;
}