import React from 'react'
import { Button } from '@mui/material';
import { makeStyles, styled } from '@material-ui/core/styles';

const ButtonStyle = (props) => {
    return (
        <div>
            <Button variant='contained' className={props.cName} onClick={props.handleClick}> {props.text}</Button>

        </div>
    )
}

export default ButtonStyle