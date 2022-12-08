
import { List, Box, TextField, Card } from '@mui/material';
import { GlobalStoreContext } from '../store/index.js';
import { useContext, useState } from 'react'




export default function CommentScreen(){
    const { store } = useContext(GlobalStoreContext);
    const [comment, setComment] = useState("");


    const handleSubmit = () => {
        console.log(comment);
        store.addComment(comment);
        console.log(store.songsToPlay);
    }

    let commentCard = "";

    if(store.songsToPlay){
        if(store.songsToPlay.public === true){
        commentCard = <List 
            id="comment-cards" 
            sx={{ width: '100%', bgcolor: 'primary'}}
        >
        {
            ((store) => {
                for(let userName in store.songsToPlay.comments){
                    <Card
                        id={'playlist-song-' + (userName)}
                        key={'playlist-song-' + (userName)}
                        userName={userName}
                        comments={store.songsToPlay.comments[userName]}
                    />
                }
            })
        }
        </List>  
        }
    }else{
        commentCard = ""
    }
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>

            <div>
                {commentCard}
            </div>

           <TextField 
            value={comment}
            placeholder='Add Comment'
            sx={{bottom: 0, width: '95%', bgcolor: 'white', position: 'absolute', marginBottom: 2}}
            onKeyPress={(ev) => {

            if (ev.key === 'Enter') {
              // Do code here
              ev.preventDefault();
              handleSubmit(comment);
            }
          }}
        onChange={(ev)=>{
            setComment(ev.target.value);
        }}>

           </TextField>
        </Box>
    )
}