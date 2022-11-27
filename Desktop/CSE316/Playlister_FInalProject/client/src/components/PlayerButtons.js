import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function PlayerButtons(){

    return (
        <div id='video-controls'>
            <Button
            variant='contained'
            >
            <SkipPreviousIcon />
            </Button>

            <Button
            variant='contained'
            >
            <StopIcon />
            </Button>

            <Button
            variant='contained'
            >
            <PlayArrowIcon />
            </Button>

            <Button
            variant='contained'
            >
            <SkipNextIcon />
            </Button>
        </div>
    )
}