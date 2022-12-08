import { Fragment, useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Typography, Card, CardContent, CardActions, Collapse } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import WorkspaceScreen from './WorkspaceScreen';
import {Modal, Button} from '@mui/material';
import EditToolbar from './EditToolbar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [isActive, setIsActive] = useState(false);
    const [expandedId, setExpandedId] = useState(-1);
    const [error, setError] = useState(false);
    const [listOpen, setListOpen] = useState(false);

    let name = idNamePair.fullName;

    function handleAddNewSong(event, id) {
        store.addNewSong(id);
    }
    function handleUndo(event, id) {
        store.undo();
    }
    function handleRedo(event,id ) {
        store.redo();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.loadSongsToPlay(id);
        }
    }

    let highlighted = "";
    if(store.songsToPlay){
        if(store.songsToPlay._id === idNamePair._id)
            highlighted ="inset";
    }


    let collapseUPorDown = "";
    if(listOpen){
        collapseUPorDown =        
        <Box 
        sx={{display: 'inline-block', float: 'right', marginRight:'30px',}}
    >
        <IconButton
            onClick={(event) => {handleCloseClick(idNamePair._id)}}
            aria-expanded={expandedId === idNamePair._id}
            aria-label="show less"
            >
            <KeyboardDoubleArrowUpIcon style={{fontSize:'20pt'}} />
        </IconButton>
    </Box>
    }
    else{
        collapseUPorDown =        <Box 
        sx={{display: 'inline-block', float: 'right', marginRight:'30px',}}
    >
        <IconButton
            onClick={(event) => {handleExpandClick(event, idNamePair._id)}}
            aria-expanded={expandedId === idNamePair._id}
            aria-label="show more"
            >
            <KeyboardDoubleArrowDownIcon style={{fontSize:'20pt'}} />
        </IconButton>
    </Box>
    }

    let workspace = "";
    let actionButtons = ""
    let deleteCase = "";
    if(idNamePair.public ){
        actionButtons = "hidden";
    }else{
        actionButtons = "";
    }

    // if(auth.loggedIn){
    //     if(idNamePair.ownerEmail !== auth.user.email){
    //         deleteCase = "hidden";

    //     } else{
    //         deleteCase = "";
    //     }
    // }

    const handleCloseClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
        store.closeCurrentList();
        setListOpen(false);
    }

    const handleExpandClick = (event, i) => {
        event.stopPropagation();
        // if(store.currentList){
        //     store.setCurrentList(i);
        // }
        // else{
        
        // }
        setExpandedId(expandedId === i ? -1 : i);
        setListOpen(true);
        store.setCurrentList(i);
    };

    const handleDuplicate = (event, i) => {
        event.stopPropagation();
        store.createNewList(0, i);
    }

    const handleCloseModal = () => {
        setError(false);
    }
    
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }


    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            let check = true;
            for(let i = 0; i < store.idNamePairs.length; i++){
                if(store.idNamePairs[i].name === text){
                    setError(true);
                    break;
                }
                else if (i === store.idNamePairs.length - 1)
                    check = false
            }
            if(check === false){
            store.changeListName(id, text);
            toggleEdit();
            }
        }
    }

    function handlePublishPlaylist(event, id) {
        event.stopPropagation();
        store.publishPlaylist(id);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
    <div id='cards'>
    <Card sx={{margin: 1, borderColor: 'purple', borderStyle: highlighted}}
    >
    <CardContent sx={{p: 0}}/>
    <CardActions disableSpacing >
    <ListItem 
            // sx={{ display: 'flex', bgcolor: "white" }}
            style={{fontSize: '18pt', height: "100px", width: "815px"}}
            id={idNamePair._id}
            key={idNamePair._id}
            // button
            onDoubleClick={(event) => {
                handleToggleEdit(event)
            }}
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}  
            >

            <Box sx={{ p: 1, flexGrow: 1, position: 'absolute', top: '0' }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1, flexGrow: 1, }}>
                <Typography variant='h7' fontSize="12pt">By: {name}</Typography>
            </Box>
            
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        // handleDeleteList(event, idNamePair._id)
                    }} 
                    aria-label='like'>
                    <ThumbUpOffAltIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>

            <Box sx={{ p: 1, float: "right", position: 'relative', display: "inline-block" }}>
                <IconButton onClick={(event) => {
                        // handleDeleteList(event, idNamePair._id)
                    }} 
                    aria-label='dislike'>
                    <ThumbDownOffAltIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>
                  
        </ListItem>
    </CardActions>

    <Collapse 
    in={expandedId === idNamePair._id} 
    timeout="auto" 
    // sx={{display: 'flex', justifyContent: 'center' }} 
    unmountOnExit
    sx={{bgcolor: 'blue', borderRadius: '20px', marginLeft: 1, marginRight: 1,}}
    >
    <CardContent sx={{ height: '300px', display: 'flex', flexDirection: 'column', overflow: 'scroll', 
        position: 'relative'}}>

        <WorkspaceScreen></WorkspaceScreen>
    </CardContent>
    <div id='edit-toolbar'>

    <div id="edit-toolbar">
            <Button
                id='add-song-button'
                onClick={(event) => {
                    handleAddNewSong(event, idNamePair._id)
                }}
                variant="contained"
                sx={{margin: 1, visibility: actionButtons}}
                >
                Add
            </Button>
            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={(event) => {
                    handleUndo(event, idNamePair._id)
                }}
                variant="contained"
                sx={{margin: 1, visibility: actionButtons}}
                >
                Undo
            </Button>
            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={(event) => {
                    handleRedo(event, idNamePair._id)
                }}
                variant="contained"
                sx={{margin: 1, visibility: actionButtons}}
                >
                Redo
            </Button>


    </div>
            <Button 
                id='publish-button'
                onClick={(event) => {
                    handlePublishPlaylist(event, idNamePair._id)
                }}
                variant="contained"
                sx={{margin: 1, visibility: actionButtons}}
                >
                Publish
            </Button>
            <Button 
                // disabled={!store.canRedo()}
                id='delete-button'
                onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} 
                variant="contained"
                sx={{margin: 1, visibility: deleteCase}}
                >
                Delete
            </Button>
            <Button 
                // disabled={!store.canUndo()}
                id='duplicate-button'
                onClick={(event) => {
                    handleDuplicate(event, idNamePair._id)
                }}
                variant="contained"
                sx={{margin: 1}}
                >
                Duplicate
            </Button>
            </div>


    </Collapse>


        <Box 
            sx={{display: 'inline-block', float: 'left',  p: 1,}}
            >
                <Typography fontSize="12pt"> Published: <b style={{color: 'blue'}}>{idNamePair.date}</b> </Typography>
        </Box>

        <Box 
            sx={{display: 'inline-block',  p: 1,}}
            >
                <Typography fontSize="12pt"> Listens: </Typography>
        </Box>

                {collapseUPorDown}

    </Card>
  </div>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '10px',
    };
    return (
        <div>
        {cardElement}
        <Modal
            open={error}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    This name already exists. Please enter a unique name.
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close</button>
                </div>
            </div>
            </Box>
        </Modal>
        </div>
    );
}

export default ListCard;