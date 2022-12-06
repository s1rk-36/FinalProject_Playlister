import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
const style ={
    position: 'absolute',
    visibility: "hidden",
    left: '0%',
    top: '90%',
    width: '100%',
    height: '10%', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36pt',
    bgcolor: "#1976d2",
}
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    let text ="";
    if (store.currentList && auth.loggedIn){
        text = store.currentList.name;
        style.visibility = "visible";
    }
    else{
        style.visibility = "hidden"; 
    }
    return (

        <div id="playlister-statusbar"
        >   
            {/* <Typography sx ={style} variant="h4">{text}</Typography> */}
        </div>
    );
}

export default Statusbar;