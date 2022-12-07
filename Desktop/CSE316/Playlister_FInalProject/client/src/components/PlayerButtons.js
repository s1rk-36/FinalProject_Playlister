import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { Button, Box } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function PlayerButtons(){

    return (
        <Box>
            <Button
            variant='contained'
            sx={{margin: 1}}
            size='small'
            >
            <SkipPreviousIcon />
            </Button>

            <Button
            variant='contained'
            sx={{margin: 1}}
            size='small'

            >
            <StopIcon />
            </Button>

            <Button
            variant='contained'
            sx={{margin: 1}}
            size='small'

            >
            <PlayArrowIcon />
            </Button>

            <Button
            variant='contained'
            sx={{margin: 1}}
            size='small'

            >
            <SkipNextIcon />
            </Button>
        </Box>
    )
}