import React, { Component } from 'react';
import { Card, IconButton, CardMedia, TextField, Typography, Button, CardContent, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

class ItemCard extends Component {
    render() {
        return <Card
            sx={{
                width: 200,
                bgcolor: '#FFFBE6'
            }}>
            <CardContent>
                <Typography variant="subtitle1" color="secondary">
                    {this.props.item}
                </Typography>
                <Typography variant="body1">
                    {this.props.amount}
                </Typography>
                <Typography variant="body2">
                    {this.props.store}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="large" color="primarysecond" aria-label="info">
                    <InfoIcon />
                </IconButton>
                <IconButton size="large" color="primarysecond" aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton size="large" color="primarysecond" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    }
}

export default ItemCard;