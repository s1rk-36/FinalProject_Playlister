import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { AppBar, Button, Grid } from '@mui/material';
import YouTubePlayerExample from './YouTubePlaylisterReact/src/PlaylisterYouTubePlayer.js';
import PlayerButtons from './PlayerButtons';
import CommentScreen from './CommentsScreen';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [playerScreen, setPlayerScreen] = useState("");
    const [commentScreen, setCommentScreen] = useState("hidden");
    const [selected, setSelected] = useState("blue");
    const [comms, setComms] = useState("");

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        console.log(document.getElementById("list-selector-list").offsetWidth);
        store.createNewList(0);
    }
    let listCard = "";

    function changeToPlayer() {
        setPlayerScreen("hidden");
        setCommentScreen("");
        setSelected("");
        setComms("blue");
    }

    function changeToComments() {
        setPlayerScreen("");
        setCommentScreen("hidden");
        setSelected("blue");
        setComms("");
    }

    if(store.searchMode === 'home'){
        if (store && store.idNamePairs.length > 0) {
            listCard = 
                
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
        }
        return (
            <div id="playlist-selector">
                <div id="list-selector-heading">
    
                <AddIcon
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    sx={{color: "black", fontSize: "40pt", cursor: "pointer"}}
                >
                </AddIcon>
    
                    <Typography variant="h2" fontSize="30pt"><b>Your Lists</b></Typography>
                </div>
                
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
    
                <div className="playlist-player">
                    
                    <div className='player-header'>
                        <Button variant="contained" onClick={changeToComments} sx={{bgcolor: selected}}>Player</Button>
                        <Button variant="contained" onClick={changeToPlayer} sx={{bgcolor: comms}}>Comments</Button>
                    </div>

                    <Box sx={{visibility: playerScreen, position: 'absolute', display: 'flex', flexDirection: 'column',
                        top: '7%', height: '75%', maxHeight: '75%', width: '100%', marginRight: 1}}>
                    <YouTubePlayerExample></YouTubePlayerExample>
                    </Box>
                    <Box sx={{visibility: commentScreen, position: 'absolute', display: 'flex', flexDirection: 'column',
                        top: '7%', height: '92.5%', width: '100%', marginRight: 1, bgcolor: 'grey'}}>
                            <CommentScreen></CommentScreen>
                    </Box>

                </div>
                
                    
            </div>
            )
    } 
    else if(store.searchMode === 'allUserPlaylists'){
        if (store && store.searchArray.length > 0 && store.searchResult) {
            listCard = 
                
                    store.searchArray.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
        }
        return (
            <div id="playlist-selector">
                <div id="list-selector-heading">
    
                    {/* <Typography variant="h2" fontSize="30pt"><b>Your Lists</b></Typography> */}
                </div>
                
    
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
    
                <div className="playlist-player">
                    
                    <div className='player-header'>
                        <Button variant="contained" onClick={changeToComments} sx={{bgcolor: selected}}>Player</Button>
                        <Button variant="contained" onClick={changeToPlayer} sx={{bgcolor: comms}}>Comments</Button>
                    </div>

                    <Box sx={{visibility: playerScreen, position: 'absolute', display: 'flex', flexDirection: 'column',
                        top: '7%', height: '75%', maxHeight: '75%', width: '100%', marginRight: 1}}>
                    <YouTubePlayerExample></YouTubePlayerExample>
                    </Box>
                    <Box sx={{visibility: commentScreen, position: 'absolute', display: 'flex', flexDirection: 'column',
                        top: '7%', height: '92.5%', width: '100%', marginRight: 1, bgcolor: 'grey'}}>
                            <CommentScreen></CommentScreen>
                    </Box>

                </div>
                            
                    
            </div>
            )
    }
    else{
        if (store && store.searchArray.length > 0 && store.searchResult) {
            listCard = 
                
                    store.searchArray.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
        }
        return(
            <div id="playlist-selector">
                <div id="list-selector-heading">
    
                    {/* <Typography variant="h2" fontSize="30pt"><b>Your Lists</b></Typography> */}
                </div>
                
    
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
    
                <div className="playlist-player">
                    
                    <div className='player-header'>
                        <Button variant="contained" onClick={changeToComments} sx={{bgcolor: selected}}>Player</Button>
                        <Button variant="contained" onClick={changeToPlayer} sx={{bgcolor: comms}}>Comments</Button>
                    </div>

                    <Box sx={{visibility: playerScreen, position: 'absolute', display: 'flex', flexDirection: 'column',
                        top: '7%', height: '75%', maxHeight: '75%', width: '100%', marginRight: 1}}>
                    <YouTubePlayerExample></YouTubePlayerExample>
                    </Box>
                    <Box sx={{visibility: commentScreen, position: 'absolute', display: 'flex', flexDirection: 'column',
                        top: '7%', height: '92.5%', width: '100%', marginRight: 1, bgcolor: 'grey'}}>
                            <CommentScreen></CommentScreen>
                    </Box>

                </div>
                            
                    
            </div>
            )
    }
   
}

export default HomeScreen;