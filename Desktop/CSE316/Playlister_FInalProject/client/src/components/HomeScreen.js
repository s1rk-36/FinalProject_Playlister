import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { AppBar, Grid } from '@mui/material';
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
        store.createNewList();
    }
    let listCard = "";
    if (store && store.idNamePairs.length > 0) {
        listCard = 
            // <List 
            // sx={{ width: '100%', left: '1%', bgcolor: 'background.paper', borderRadius: "25px", padding: 1 }}
            // >
            
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            
            // </List>;
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
            
            <div id="playlist-player"></div>
            
        </div>
        )
}

export default HomeScreen;