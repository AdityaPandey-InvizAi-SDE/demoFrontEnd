import React, { useState, useEffect, useRef } from 'react'
//  material ui 
import { Container, Stack, Grid, Box, Button, TextField } from '@mui/material';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from '@mui/material/Paper';
import ButtonStyle from './ButtonStyle';

import ReactLoading from 'react-loading';
// import Box from '@mui/material/Box';

import axios from 'axios';
import { hashRandom } from 'react-hash-string'

import Question from './Question';
import AnswerOptions from './AnswerOptions';
import { red } from '@mui/material/colors';
import { fontFamily, width } from '@mui/system';
import Typing from '../Typing';

const useStyles = makeStyles({
    paper: {
        background: '#F0F8FF',
        // color: 'white',
        height: "900px",
        fontFamily: "sans-serif",
        letterSpacing: "0.5px",
        border: "2px solid black"
    },

    backstyle: {
        background: "#646464",
        height: "6vh",
        width: "10vw",
        fontFamily: "Proxima Nova",
        fontSize: "20px"


    },

    frontstyle: {
        background: "#646464",
        height: "5vh",
        width: "10vw",
        fontFamily: "Proxima Nova",
        fontSize: "20px"
    },

    gridStyle: {
        height: "700px",
        // background: "green"
    },
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
        color: " #000000",
        variant: "contained"



    },

    taxonbuttonStyle: {
        background: "#F0F8FF",
        height: "3vh",
        width: "7.5vw",
        fontFamily: "Proxima Nova",
        fontSize: "11px",
        fontWeight: 'bold',
        // marginTop: "0.5vh",
        color: " #000000",
        flexDirection: 'row'
        // variant: "contained"
        // marginLeft: '1vw'


    },

    containerStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // background: "#646464",
        // marginLeft: "5vw",
        // marginRight: "5vw",
        marginTop: "1vh"

    },

    loaderStyles: {
        // background: '#1976d2',
        width: '20vw',
        height: '30vh',
        marginLeft: '20vw'
    }

});


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Quiz = () => {

    const classes = useStyles();
    const [sessid] = useState("XX" + hashRandom());
    const [questionno, setQuestionno] = useState(1);
    const [question, setQuestion] = useState('');
    const [answerOption, setAnswerOption] = useState([]);
    const [alloptions, setAllOptions] = useState([]);
    const [nextButton, setNextButton] = useState(null);
    const [freetext, setFreeText] = useState(0);
    const [textvalue, setTextValue] = useState('');
    const [selectoption, setSelectOption] = useState([]);
    const [recoid, setRecoId] = useState("no reco");
    const [isLoading, setLoading] = useState(true);

    const reco = [];

    //  Add api here to fetch question 

    useEffect(
        () => {
            console.log("intiating api hit ");
            if (questionno < 16) {
                axios.get(`http://127.0.0.1:8000/api/quizquestion/SQ${questionno}/`)
                    .then((res) => {
                        console.log(res.data, "question");
                        setQuestion(res.data.text);
                        // Add Api to fetch answer option 
                        if (res.data.freetext === 1) {
                            setFreeText(null);
                        }


                        axios.get(`http://127.0.0.1:8000/api/answeroption/${res.data.id}/`)
                            .then((res) => {
                                console.log(res.data, "option data");

                                setAnswerOption(res.data);
                                setNextButton(null);
                                // setLoading(true);


                            })
                            .catch((err) => {
                                console.log(err);
                                setNextButton("next");
                                setFreeText(null);
                            });



                    })
                    .catch((err) => {
                        console.log(err);
                        setNextButton("next");

                    });

            }


            else {
                console.log("show recommendation for : ", sessid);
                setQuestion("Please find your personalized recommendation based on the input provided..");
                //  Add recommendation API here
                setAnswerOption([])
                axios.get(`http://127.0.0.1:8000/api/recommendationskincare/${sessid}/`)
                    .then(res => {
                        console.log(res.data);
                        res.data['reco'].map((item) => {
                            reco.push({ text: item.product_name })
                        })
                        setRecoId(null)
                        setAnswerOption(reco);
                        setLoading(true);
                    })
                    .catch((err) => {
                        console.log(err)
                    })

                console.log(reco, 'answerOption')

                // setAnswerOption(reco);



            }
            console.log(questionno);

        }, [questionno]
    );







    //  handle click in back 
    const handleClick_back = (e) => {
        console.log("back buttom click");
        if (questionno > 1) {
            setQuestionno(questionno - 1);
            console.log(questionno);
            setLoading(false);
        }
    }

    const handleClick_next = (e) => {
        console.log("next button clicked");
        if (questionno < 16) {
            setQuestionno(questionno + 1);
            console.log(questionno);
            setNextButton("next");
            setFreeText(0);
            if (questionno < 15) {
                console.log('no reco')
            }
            else {
                console.log('reco')
                setLoading(false);
            }
            if (freetext === null) {
                console.log("input field");
                console.log(textvalue);
                setAllOptions([...alloptions, textvalue]);
            };

            // console.log(selectoption, "selectoption");
            selectoption.map((item) => {
                console.log(item, "------------>>>>>>>");
                const payload = {
                    "spree_option_id": item.id,
                    "spree_question_id": item.spree_question_id,
                    "question_text": item.question,
                    "option_text": item.text,
                    "important_ingredients": item.important_ingreds,
                    "sess_id": sessid,
                    "slug": item.slug
                };
                axios.post(`http://127.0.0.1:8000/api/customerresponsequiz`, payload)
                    .then(res => console.log(res, "response sucessful"))
                    .catch(err => console.log(err));

            });

            setSelectOption([]);


        }
        else {
            setNextButton(null);
        }



    }

    console.log(recoid, reco.length, "final freetext")

    return (
        <div>
            <Container className={classes.paper}>


                <Typography align="center">
                    <h1>Recommendation Quiz Demo <hr /></h1>
                </Typography>


                <br />
                <br />

                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={9} >
                        <Item className={classes.gridStyle}>
                            <Question questiontext={question} />
                            {freetext === null ? <Box sx={{ width: 500, maxWidth: '100%', marginLeft: "10vw", marginTop: "10vh" }}>
                                <TextField fullWidth label="Enter your text here" id="fullWidth" value={textvalue}
                                    onChange={(event) => { setTextValue(event.target.value) }} />
                            </Box> :
                                <AnswerOptions prop={answerOption} alloptions={alloptions} setAllOptions={setAllOptions} buttonStyle={classes.buttonStyle} nextButton={nextButton} selectoption={selectoption} setSelectOption={setSelectOption} questionno={questionno} />
                            }
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <div style={{ position: 'absolute', bottom: 0, marginBottom: "70px" }}>
                                    <Stack direction="row" spacing={60}>
                                        <ButtonStyle text='BACK' cName={classes.backstyle} handleClick={handleClick_back} />

                                        < ButtonStyle text='NEXT' cName={classes.frontstyle} handleClick={handleClick_next} />
                                    </Stack>
                                </div>
                            </div>

                            {/* {isLoading ? null : <Typing />} */}

                            {isLoading ? null : <div className={classes.loaderStyles}>
                                <h1> Tiro is finding personalized products for you .....</h1>
                                <ReactLoading type={'spokes'} color={'#1976d2'} height={'90%'} width={'90%'} /> </div>}
                        </Item>

                    </Grid>

                    <Grid item xs={3} >
                        <Item>
                            <h3>Important Ingredients </h3>
                            <hr />
                            <Box>
                                <div className={classes.containerStyle}>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        {alloptions.map(item => (
                                            <Grid item xs={6}>
                                                <Button className={classes.taxonbuttonStyle} variant="contained" size="large">
                                                    {item}
                                                </Button>
                                            </Grid>

                                        ))}

                                    </Grid>
                                </div>

                            </Box>

                        </Item>
                    </Grid>


                </Grid>
            </Container>
        </div>
    )
}

export default Quiz