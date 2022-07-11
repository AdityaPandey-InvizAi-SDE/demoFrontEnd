import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
// import Chatbot from './chatbot'
export default function ActionAreaCard(props) {
    return (
        <Card sx={{ maxWidth: 345 }} variant="outlined" >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={props.img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}
