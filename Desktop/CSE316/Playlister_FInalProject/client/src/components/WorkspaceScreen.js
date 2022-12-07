import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/

function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    // store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen() && store.currentList !== null) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen() && store.currentList !== null) {
        modalJSX = <MUIRemoveSongModal />;
    }
    
    
    if(store.currentList)
    return (
        <div id='workspace'>
        <Box>
        <div id="top5-workspace">
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'primary'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </div>
         </Box>
         </div>
    )
    else
    return null;
}

export default WorkspaceScreen;