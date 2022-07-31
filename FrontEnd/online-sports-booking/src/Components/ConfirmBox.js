import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const stackColumnHeight = {
    width: '50%',
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px'
}

export default function PopUp({title,description,okCallback,cancelCallback}) {
    
    return (
        <div>
            
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>

                        <p>{description}</p>





                        <Stack direction="row" style={{float:'right',marginTop:'30px',marginRight:'10px'}}>
                            <Stack direction="column" style={{marginRight:'10px'}}>
                                <Button variant="outlined" onClick={()=>{cancelCallback()}}>Cancel</Button>
                            </Stack>
                            <Stack direction="column">
                                <Button variant="contained" onClick={()=>{okCallback()}}>Ok</Button>
                            </Stack>
                        </Stack>



                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    );
}
