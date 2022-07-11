import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        // marginTop: theme.spacing(2),
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(3),
        // [theme.breakpoints.up('sm')]: {
        //     // paddingTop: theme.spacing(2),
        //     paddingBottom: theme.spacing(2),
        // },
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center"  >
            { 'Copyright ©'}
            < Link color="inherit" href="https://material-ui.com/" >
                TiroLabs
			</Link > { ' '}
            { new Date().getFullYear()}
            { '.'}
        </Typography >
    );
}



function Footer() {
    const classes = useStyles();
    return (

        <Container className={classes.footer} >
            <Box mt={12}>
                <Copyright />
            </Box>
        </Container >

    );
}

export default Footer;