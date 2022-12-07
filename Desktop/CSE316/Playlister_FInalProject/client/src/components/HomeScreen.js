import React, { useContext, useEffect } from 'react'
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

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        console.log(document.getElementById("list-selector-list").offsetWidth);
        store.createNewList(0);
    }
    let listCard = "";


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
                        <Button variant="contained">Player</Button>
                        <Button variant="contained">Comments</Button>
                        
                        {/* <div className='youtube'> */}
                        {/* </div> */}
    
                    </div>
                    <YouTubePlayerExample></YouTubePlayerExample>

                      
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
                        <Button variant="contained">Player</Button>
                        <Button variant="contained">Comments</Button>
                        
                        <div className='youtube'>
                        <YouTubePlayerExample></YouTubePlayerExample>
                        </div>
    
                    </div>
    
                    <div className='player-controls'>
                        <div className='player-buttons'>
                        <Box sx={{ flexGrow: 1 }}><PlayerButtons /></Box>
                        </div>
                    </div>
    
                      
                </div>
                
                    
            </div>
            )
    }
    else{
        return(
            <div></div>
        )
    }
   
}

export default HomeScreen;