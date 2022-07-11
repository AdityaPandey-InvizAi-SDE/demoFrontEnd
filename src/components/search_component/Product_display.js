import React from 'react'
import { makeStyles, styled } from '@material-ui/core/styles';
// import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


const useStyles = makeStyles({
    listSubheaderStyle: {
        background: '#D3D3D3',
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 20,
        "fontWeight": 600
    }
});


const Product_display = ({ prop }) => {

    const classes = useStyles();

    console.log(prop, "prodcut page");
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 900,
                bgcolor: '#FFFFFF',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 500,
                '& ul': { padding: 0 },
                marginLeft: '10vw'
            }}
            subheader={<li />}
        >
            {prop.map((item) => (
                <li key={item.product_id}>
                    <ul>
                        <ListSubheader className={classes.listSubheaderStyle}>{item.product_name} || {item.brand_name} </ListSubheader>
                        <ListItem key={item.product_id}>

                            <ListItemText>{item.description}</ListItemText>

                        </ListItem>

                    </ul>
                </li >
            ))}
        </List >


    )

    // { prop.map((item) => <p>item.product_name</p>) }
}

export default Product_display