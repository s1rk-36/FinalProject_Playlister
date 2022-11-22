import * as React from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle, Button, Dialog } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ErrorModal(props) {
    const button = (
        <Button 
            variant='outlined'
            color="warning" 
            onClick={props.hideAlert}
            > X </Button>
    );
    return(
        
        <Dialog open = {props.propOpen}>
        <Alert
            severity="warning"
        >
        <AlertTitle >{props.propMessage}{button}</AlertTitle>
        </Alert>
        </Dialog>

    )
}