import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles({


    buttonStyle: {
        background: "white",
        height: "4vh",
        width: "20vw",
        fontFamily: "Proxima Nova",
        fontSize: "15px",
        // marginTop: "0.5vh",
        color: " #000000",
        variant: "contained"
        // marginLeft: '1vw'


    },

    activebuttonStyle: {
        background: "#F0F8FF",
        height: "4vh",
        width: "20vw",
        fontFamily: "Proxima Nova",
        fontSize: "15px",
        // marginTop: "0.5vh",
        // color: " #000000",
        // variant: "contained"



    },

    containerStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: "#646464",
        marginLeft: "5vw",
        marginRight: "5vw",
        marginTop: "3vh"

    },

    space: {
        width: 20, // or whatever size you need
        height: 20,
    },



});






const AnswerOptions = ({ prop, alloptions, setAllOptions, nextButton, selectoption, setSelectOption, questionno }) => {

    const classes = useStyles();
    const [options, setOptions] = useState([]);
    // const [active, setActive] = useState(null);

    // console.log(nextButton, "child");




    const handleClick = (e) => {
        console.log("Button Clicked");


        if (e.target.className === classes.activebuttonStyle) {
            e.target.className = classes.buttonStyle;
            setOptions(options.filter(item => item !== e.target.value))

            // setAllOptions(alloptions.filter(item => item !== e.target.value));
            axios.get(`http://127.0.0.1:8000/api/ingredient/${e.target.value}/`)
                .then((res) => {
                    console.log(res.data.important_ingreds.split(","));
                    setAllOptions(alloptions.filter(item => res.data.important_ingreds.split(",").indexOf(item) === -1));
                })
                .catch((err) => {
                    console.log(err)
                })
            // setActive(null);

        }
        else {
            e.target.className = classes.activebuttonStyle;
            setOptions([...options, e.target.value])
            // setAllOptions([...alloptions, e.target.value]);
            console.log("hit api for choices");
            axios.get(`http://127.0.0.1:8000/api/ingredient/${e.target.value}/`)
                .then((res) => {
                    console.log(res.data.important_ingreds.split(","));
                    setAllOptions([...alloptions, ...res.data.important_ingreds.split(",")]);

                })
                .catch((err) => {
                    console.log(err)
                })

            prop.map((item) => {
                console.log(item.id === Number(e.target.value));
                if (item.id === Number(e.target.value)) {
                    item["slug"] = `SQ${questionno}`
                    console.log(item, "selected");

                    // Create a state to store this results 
                    setSelectOption([...selectoption, item]);
                }
            })


            // setActive('active');
        }
        ;



        // console.log(clicked, "clicked");
        // console.log(filterOption(prop, e.target.value), 'answerOption');
    }

    console.log("check status");
    console.log(prop, "check prop");
    // console.log(prop);




    return (

        <div className={classes.containerStyle}>

            <form>

                {
                    prop.map((item) =>

                        <Button variant="outlined" className={nextButton ? classes.activebuttonStyle : classes.buttonStyle} sx={{ m: 1 }} onClick={handleClick} value={item.id}>
                            {item.text}
                        </Button>



                    )
                }
            </form >

        </div>



    )
}

export default AnswerOptions