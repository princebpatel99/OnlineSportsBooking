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
import { textAlign } from '@mui/system';
import { FetchData } from '../RestAPI/database';


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

export default function PopUp({callback}) {
    const [open, setOpen] = React.useState(false);
    const [from, setFrom] = React.useState(new Date());
    const [to, setTo] = React.useState(new Date());
    const [ground, setGround] = React.useState(404);
    const [sport, setSport] = React.useState(404);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const bookSlot = async () =>{
        let fromDate = new Date(from);
        let toDate = new Date(to)
        var body = {
            FromDate : fromDate,
            ToDate : toDate,
            FromTime : fromDate.getHours()+":"+fromDate.getMinutes(),
            ToTime : toDate.getHours()+":"+toDate.getMinutes(),
            GroundName : ground,
            Sports : sport,
            Status : "Active",
            BookBy : "Self",
            isTournament : false,
            tournamentID : "",
            totalPeople : ""
        }
        var x = await FetchData("/api/OSBSlotBook","POST",body);
        if(x.isSuccess){
            callback();
            handleClose();
        }
        else{
            alert(x.message)
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>Book a Slot</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Book your Slot
                        </Typography>

                        <Stack direction="row">
                            <Stack style={stackColumnHeight} direction="column">
                                <DateTimePicker
                                    label="From"
                                    value={from}
                                    onChange={(e) => { setFrom(e) }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                            <Stack style={stackColumnHeight} direction="column">
                                <DateTimePicker
                                    label="To"
                                    minDateTime={from}
                                    value={to}
                                    onChange={(e) => { setTo(e) }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </Stack>
                        <Stack direction="row">
                            <Stack style={stackColumnHeight} direction="column">
                                <Select
                                    value={ground}
                                    label="Ground"
                                    onChange={(e) => { setGround(e.target.value) }}
                                >
                                    <MenuItem value={404} disabled>Select Ground</MenuItem>
                                    <MenuItem value={"Ground 1"}>Ground 1</MenuItem>
                                    <MenuItem value={"Ground 2"}>Ground 2</MenuItem>
                                    <MenuItem value={"Ground 3"}>Ground 3</MenuItem>
                                    <MenuItem value={"Ground 4"}>Ground 4</MenuItem>
                                </Select>
                            </Stack>
                            <Stack style={stackColumnHeight} direction="column">
                                <Select
                                    value={sport}
                                    label="Sports"
                                    onChange={(e) => { setSport(e.target.value) }}
                                >
                                    <MenuItem value={404} disabled>Select Sport</MenuItem>
                                    <MenuItem value={"Sport 1"}>Sport 1</MenuItem>
                                    <MenuItem value={"Sport 2"}>Sport 2</MenuItem>
                                    <MenuItem value={"Sport 3"}>Sport 3</MenuItem>
                                    <MenuItem value={"Sport 4"}>Sport 4</MenuItem>
                                </Select>
                            </Stack>
                        </Stack>






                        <Stack direction="row" style={{float:'right',marginTop:'30px',marginRight:'10px'}}>
                            <Stack direction="column" style={{marginRight:'10px'}}>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            </Stack>
                            <Stack direction="column">
                                <Button variant="contained" onClick={bookSlot}>Book Now</Button>
                            </Stack>
                        </Stack>



                    </LocalizationProvider>
                </Box>
            </Modal>
        </div>
    );
}
