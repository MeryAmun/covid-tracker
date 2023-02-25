import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './infobox.css'

const InfoBox = ({title, cases, total}) => {
  return (
    <Card>
        <CardContent>
            <Typography color='textSecondary'>{title}</Typography>
            <h2 className='infoBox__title'>{cases}</h2>
            <Typography color='textSecondary'>{total} Total</Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox