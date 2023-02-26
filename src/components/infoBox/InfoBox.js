import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './infobox.css'

const InfoBox = ({title, cases, total,...props}) => {
  return (
    <Card className='infoBox' onClick={props.onClick}>
        <CardContent>
            <Typography color='textSecondary'>{title}</Typography>
            <h2 className='infoBox__cases'>{cases}</h2>
            <Typography color='textSecondary' className='infoBox__total'>{total} Total</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox