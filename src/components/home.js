import { Container, Grid } from '@mui/material';
import * as React from 'react';
import MediaCard from '../components/card';
import Chatbot from '../components/chatbot';
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Comingsoon from '../components/comingsoon';




// import Chatbot from './chatbot';


const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px"

    },

    styleContainer: {
        marginTop: "50px"
    },

    title: {
        flexGrow: 1,
        textAlign: 'center',
        paddingBottom: "30px"
    },
});




export default function Home({ props }) {

    const classes = useStyles();

    console.log(props, "test props");

    return (

        <Container className={classes.styleContainer}>
            <Typography variant="h3" className={classes.title}> Project Demo</Typography>

            <Grid container spacing={6} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to='/chatbot' style={{ textDecoration: 'none' }}>
                        <MediaCard
                            title="ChatBot"
                            description="A chatbot is a computer program that simulates human conversation through voice ...."
                            img="https://cdn.technologyadvice.com/wp-content/uploads/2018/02/friendly-chatbot.jpg"
                        />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to='/quiz' style={{ textDecoration: 'none' }}>
                        <MediaCard
                            title="Quiz"
                            description="Detail question to access the user requirement and make personalized recommendation"
                            img="https://www.sephora.com/contentimages/editorial/2018/mayskincare/skincarefinder/desktop/2018-05-01-lp-skincare-finder-start-page-us-ca-d-slice.jpg" />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to='/product_search' style={{ textDecoration: 'none' }}>
                        <MediaCard
                            title="Search As You Type and Elastic Search"
                            description="Implementation of Search as you type and use elastic search to find improved search results ..... "
                            img="https://coralogix.com/wp-content/uploads/2020/06/Autocomplete-with-Search_as_you_type-1536x864.png" />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to='/skintype' style={{ textDecoration: 'none' }}>
                        <MediaCard title="Find your Skin type"
                            description="Find your skin type to find your skin type and the best match Foundation......"
                            img="https://londonpremierlaser.co.uk/wp-content/uploads/2020/04/blog-images-16.jpg" />
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to='/comingsoon' style={{ textDecoration: 'none' }}>
                        <MediaCard />
                    </Link>
                </Grid>

            </Grid>
        </Container>
    );
}

