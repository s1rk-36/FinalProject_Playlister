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

    let fullname = auth.getFullName();

    

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }
    let date = "";

    const handleExpandClick = (event, i) => {
        event.stopPropagation();
        setExpandedId(expandedId === i ? -1 : i);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            if(!store.currentList)
                store.setCurrentList(i);
            else
                store.closeCurrentList();
        }
    };

    
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

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
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
    <Card>
    <CardContent />
    <CardActions disableSpacing>
    <ListItem 
            sx={{ display: 'flex', borderRadius: "20px", bgcolor: "white" }}
            style={{fontSize: '18pt', height: "130px", marginLeft: "20px", marginBottom: "15px", width: "815px" }}
            id={idNamePair._id}
            key={idNamePair._id}
            // button
            onDoubleClick={(event) => {
                handleToggleEdit(event)
            }}
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}  
            >

            <Box sx={{ p: 1, flexGrow: 1, position: 'absolute', top: '0' }}>{idNamePair.name}</Box>
            <Box sx={{ p: 1, flexGrow: 1, }}>
                <Typography variant='h7' fontSize="12pt">By: {fullname}</Typography>
            </Box>
            
            {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} 
                    aria-label='delete'>
                    <DeleteIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box> */}
            
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} 
                    aria-label='like'>
                    <ThumbUpOffAltIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>

            <Box sx={{ p: 1, float: "right", position: 'relative', display: "inline-block" }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} 
                    aria-label='dislike'>
                    <ThumbDownOffAltIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box>
                  
        </ListItem>
    </CardActions>
    <Collapse in={expandedId === idNamePair._id} timeout="auto" sx={{display: 'flex', justifyContent: 'center' }} unmountOnExit>
      <CardContent>
        <WorkspaceScreen></WorkspaceScreen>
      </CardContent>
    </Collapse>
    <Box 
            sx={{display: 'inline-block', float: 'left',  p: 1,}}
            >
                <Typography fontSize="12pt">Published: </Typography>
            </Box>

            <Box 
            sx={{display: 'inline-block', float: 'left',  p: 1,}}
            >
                <Typography fontSize="12pt">Listens: </Typography>
            </Box>

                <Box 
                    sx={{display: 'inline-block', float: 'right', marginRight:'30px',p: 1,}}
                >
                    <IconButton
                        onClick={(event) => {handleExpandClick(event, idNamePair._id)}}
                        aria-expanded={expandedId === idNamePair._id}
                        aria-label="show more"
                        >
                        <KeyboardDoubleArrowDownIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                </Box>
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
    return (
        cardElement
    );
}

export default ListCard;