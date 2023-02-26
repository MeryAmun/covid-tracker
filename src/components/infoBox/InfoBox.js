import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './infobox.css'

const InfoBox = ({title, cases,active,isRed, total,...props}) => {
  return (
    <Card className={`infoBox ${ active && "infoBox--selected"} ${isRed && "infoBox--red"}`} onClick={props.onClick}>
        <CardContent>
            <Typography color='textSecondary'>{title}</Typography>
            <h2 className={`infoBox__cases ${!isRed && "infoBox--green"}`}>{cases}</h2>
            <Typography color='textSecondary' className='infoBox__total'>{total} Total</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox