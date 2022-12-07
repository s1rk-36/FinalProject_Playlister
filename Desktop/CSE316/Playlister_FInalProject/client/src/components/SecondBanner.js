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
    const [searchResult, setSearchResult] = useState("");

    let homeBorder = ''
    let userPlaylists = ''
    let users = ''

    if(store.searchMode === 'home'){
        homeBorder = 'inset'
        users = ''
        userPlaylists = ''
        
    } 
    else if(store.searchMode === 'allUserPlaylists'){
        homeBorder = ''
        users = ''
        userPlaylists = 'inset'
    }
    else{
        homeBorder = ''
        users = 'inset'
        userPlaylists = ''
    }

    const handleHomeClick = (mode) =>{
        store.displayUserOwnedLists();
        store.setSearchMode(mode);
        setSearchResult('');
    }
    
    const handleAllUserPlaylists = (mode) =>{
        store.setSearchMode(mode);
        setSearchResult('');
    }

    const handleAllUsers = (mode) =>{
        store.setSearchMode(mode);
        setSearchResult('');
    }

    const handleSubmit = () => {
        console.log(searchResult)
        store.displaySearchResults(searchResult);
    }

    if (auth.loggedIn){
    return (
        <Box sx={{ height: "50px"}}>
            <AppBar position="static" sx={{bgcolor: "#0e5584"}}>
            <Box sx={{ display: { xs: 'none', md: 'flex', height: "50px" }, zIndex: "2"}}
            display='flex'>
                        <HomeIcon
                            edge="end"
                            aria-label="home screen view"
                            onClick={(event) => {handleHomeClick('home')}}
                            sx={{fontSize: 45, marginLeft: 2, color: "black", cursor: "pointer",
                             borderColor: 'blue', borderStyle: homeBorder, borderRadius: '20px'}}
                        >
                        </HomeIcon>
                        <GroupsIcon
                        aria-label="all lists"
                        onClick={(event) => {handleAllUserPlaylists('allUserPlaylists')}}

                        sx={{fontSize: 45, marginLeft: 1, color: "black", cursor: "pointer",
                            borderColor: 'blue', borderStyle: userPlaylists, borderRadius: '20px'}}
                        >
                        </GroupsIcon>
                        <PersonIcon
                        aria-label="owned lists"
                        onClick={(event) => {handleAllUsers('allUsers')}}

                        sx={{fontSize: 45, marginLeft: 1, color: "black", cursor: "pointer",
                            borderColor: 'blue', borderStyle: users, borderRadius: '20px'}}
                        >
                        </PersonIcon>

 
                        <TextField
                        id="searc-bar" 
                        value={searchResult}
                        placeholder='Search'
                        variant="outlined"
                        sx={{bgcolor: "white", width: "800px", marginLeft: 10, borderRadius: "10px"}}
                        fullWidth="40%"
                        onKeyPress={(ev) => {

                            if (ev.key === 'Enter') {
                              // Do code here
                              ev.preventDefault();
                              handleSubmit(searchResult);
                            }
                          }}
                        onChange={(ev)=>{
                            setSearchResult(ev.target.value);
                        }}
                        >
                        </TextField> 
                       

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