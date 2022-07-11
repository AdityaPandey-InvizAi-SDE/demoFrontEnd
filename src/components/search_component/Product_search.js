import React, { useState, useEffect, useRef } from 'react';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import { Container, Stack, Grid, Box, Autocomplete, TextField, Button } from '@mui/material';
import ReactLoading from 'react-loading';
import { makeStyles, styled } from '@material-ui/core/styles';
import Product_display from './Product_display';

const useStyles = makeStyles({
    paper: {
        background: '#F0F8FF',
        // color: 'white',
        height: "900px",
        fontFamily: "sans-serif",
        letterSpacing: "0.5px",
        border: "2px solid black"
    },

    loaderStyles: {
        // background: '#1976d2',
        width: '30vw',
        height: '30vh',
        marginLeft: '10px'
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


    loaderStyles: {
        // background: 'red',
        width: '25vw',
        height: '20vh',
        marginLeft: '25vw'
    }

})

const Product_search = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSearch, setLoadingSearch] = useState(true);
    const firstRef = useRef(true);
    const [value, setValue] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [isResult, setIsResult] = useState(true);

    console.log(isLoadingSearch, '<<<<<');

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/api/allproducts`)
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
                setLoading(false);
                firstRef.current = false;
                // console.log(products, products.length);

            })
            .catch(err => {
                console.log(err);
                setLoading(true);
            })
    }



    if (firstRef.current === true) {
        getData()
    }

    useEffect(() => {
        console.log(value, "kjdjkdkdkkd <<<<<<<<<")
        if (value) {
            axios.get(`http://127.0.0.1:8000/api/product_search/${value}/`)
                .then(res => {
                    console.log(res.data);
                    setSearchResult(res.data);
                    console.log(value, "<<<<<<<<<<<<<<test")
                    setLoadingSearch(false);
                    setIsResult(false);

                })
                .catch(err => {
                    console.log(err);
                    setLoadingSearch(true);
                })
        }
        else {
            setSearchResult([]);
        }
    }, [value])

    console.log(isLoadingSearch, searchResult.length, isResult, '<<<<<');
    return (
        <Container className={classes.paper}>

            {isLoading ? null :
                <Typography align="center">
                    <h1>Search As you Type and Elastic Search  Demo <hr />
                    </h1>

                </Typography>
            }
            <br />
            <br />

            {isLoading ? null :
                <Typography align="center">
                    <h2>Search As you Type using React
                    </h2>

                </Typography>

            }

            {isLoading ? <div className={classes.loaderStyles}>

                <h2> Tiro is fetching the data .....</h2>
                <ReactLoading type={'bars'} color={'#1976d2'} height={'20%'} width={'20%'} />
            </div>
                :

                <Stack spacing={2} width='700px' marginLeft={'15vw'} >
                    <Autocomplete
                        options={products.map(item => item.name)}
                        renderInput={(params) => <TextField {...params} label='Search Product Here ....' />}
                        value={value}
                        onChange={(event: any, newValue: string | null) => setValue(newValue)}
                        freeSolo

                    />
                </Stack>



            }

            {isResult ? null
                :
                <Typography align="center">
                    <h2> {searchResult.length} Products found for {value} using ElasticSearch</h2>
                    {/* <p>{value}</p> */}
                </Typography>


            }


            {isLoadingSearch ? null :
                <Product_display prop={searchResult} />
            }







        </Container >

    )
}

export default Product_search