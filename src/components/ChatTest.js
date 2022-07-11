import React, { useState, useEffect } from 'react'
import { Avatar, Container, Grid, Button, TextField } from '@mui/material';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';


const useStyles = makeStyles({
    paper: {
        background: 'ivory',
        // color: 'white',
        height: "800px",
        fontFamily: "sans-serif",
        letterSpacing: "0.5px"

    },

    AvatarStyle: {
        margin: 10,
        width: 80,
        height: 80,
    },

    headerTitle: {
        color: "white",
        fontSize: "40px",
        float: "left",
        marginTop: "-30px",
        marginLeft: "30px"
    },
    stopsignStyle: {
        background: "None",
        cursor: "pointer",
        float: "right",
        marginTop: "15px",
        marginRight: "-30px",
        width: "30px",
        height: "30px"
        // marginRight: "1px"
    },
    msgPage: {
        height: "500px",
        width: "500px",
        overflowY: "scroll",
        border: "1px solid #CCC",
        display: "inline-block"
    },

    formStyle: {
        width: "475px",
        marginLeft: "10px",
        marginTop: "220px",


    },

    buttonStyle: {
        width: "100px",
        height: "100px"
    },



});


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ChatTest = () => {

    const classes = useStyles();
    const [mssg, setMssg] = useState([{ id: 0, value: 'What is ur name' }]);
    const [currmssg, setCurrmssg] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        console.log(" change in text box");
        console.log(e.target.value);
        setCurrmssg(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setMssg([...mssg, {
            id: mssg.length,
            value: currmssg
        }]);

    };



    return (
        <div>ChatTest
            <ul>
                {mssg.map(item => (
                    <li key={item.id}> {item.value}</li>
                ))}
            </ul>

            <form className={classes.formStyle}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField id="message" className={classes.formStyle} label="Enter your Message" name="message" variant="outlined" placeholder="Enter Your Message" onChange={handleChange} />
                    <Button endIcon={<SendIcon />} onClick={handleSubmit} type='submit'>Send</Button>
                    {/* <SendIcon className={classes.iconStyle} /> */}
                </Box>
            </form>


        </div>

    )
}

export default ChatTest