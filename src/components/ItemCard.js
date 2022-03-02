import React, { Component } from 'react';
import { Card, IconButton, Typography, CardContent, CardActions, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Axios from 'axios';

class ItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            nutritionList: []
        };
    };

    componentDidMount() {
        this.getNutrition(this.props.item);
    }

    getNutrition = (food) => {
        Axios.get('https://grocerylist-maker.herokuapp.com/nutrition',
            {
                params: {
                    food: food
                }
            }).then((response) => {
                if (response.status === 200 && response.data.parsed.length !== 0) {
                    this.setNutritionList(response.data.parsed[0].food.nutrients);
                }
            })
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => this.setState({ open: false });

    setNutritionList = (nutritionList) => this.setState({ nutritionList: nutritionList });
    
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
                <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                    <DialogTitle color='secondary'>
                        Nutritional Information per 100g
                    </DialogTitle>
                    <DialogContent>
                        <div className="fields">
                            <Typography variant="body1">
                                Calories: {this.state.nutritionList.ENERC_KCAL}
                            </Typography>
                            <Typography variant="body1">
                                Carbs: {this.state.nutritionList.CHOCDF} g
                            </Typography>
                            <Typography variant="body1">
                                Fat: {this.state.nutritionList.FAT} g
                            </Typography>
                            <Typography variant="body1">
                                Protein: {this.state.nutritionList.PROCNT} g
                            </Typography>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
            <CardActions className='itemCardButtons'>
                <IconButton onClick={this.handleOpen} size="large" color="primarysecond" aria-label="info">
                    <InfoIcon />
                </IconButton>
                {/* <IconButton size="large" color="primarysecond" aria-label="edit">
                    <EditIcon />
                </IconButton> */}
                <IconButton onClick={() => this.props.deleteItem(this.props.id)} size="large" color="primarysecond" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    }
}

export default ItemCard;