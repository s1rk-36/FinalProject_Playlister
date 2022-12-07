import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }


    return (
        null
        // <div id="edit-toolbar">
        //     <Button
        //         // disabled={!store.canAddNewSong()}
        //         id='add-song-button'
        //         onClick={handleAddNewSong}
        //         variant="contained"
        //         sx={{margin: 1}}
        //         >
        //         Add
        //     </Button>
        //     <Button 
        //         disabled={!store.canUndo()}
        //         id='undo-button'
        //         onClick={handleUndo}
        //         variant="contained"
        //         sx={{margin: 1}}
        //         >
        //         Undo
        //     </Button>
        //     <Button 
        //         disabled={!store.canRedo()}
        //         id='redo-button'
        //         onClick={handleRedo}
        //         variant="contained"
        //         sx={{margin: 1}}
        //         >
        //         Redo
        //     </Button>


        // </div>
    )
}

export default EditToolbar;