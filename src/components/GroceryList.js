import React, { Component } from 'react';
import { Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios';
import ItemCard from './ItemCard';
import {update} from '../actions';
import { connect } from "react-redux";


class GroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            // item: '',
            // amount: '',
            // store: '',
            // itemList: [],
        };
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => this.setState({ open: false });
    // setStore = (store) => this.setState({ store: store });
    // setAmount = (amount) => this.setState({ amount: amount });
    // setItem = (item) => this.setState({ item: item });
    // setItemList = (itemList) => this.setState({ itemList: itemList });

    addItem = () => {
        if (this.props.item === "" || this.props.amount === "" || this.props.store === "") {
            return;
        }
        Axios.post('https://grocerylist-maker.herokuapp.com/create', {
            item: this.props.item,
            amount: this.props.amount,
            store: this.props.store
        }).then(() => {
            console.log("success");
            this.clearFields();
            this.getItems();
            this.handleClose();
        })
    };

    clearFields = () => {
        this.props.update('ITEM', "");
        this.props.update('AMOUNT', "");
        this.props.update('STORE', "");
    }

    deleteItem = (id) => {
        console.log("Delete Function: " + id);
        Axios.delete('https://grocerylist-maker.herokuapp.com/delete', {
            data: {
                id: id
            }
        }).then(() => {
            console.log("sent delete request");
            this.getItems();
            this.clearFields();
        })
    };

    getItems = () => {
        Axios.get('https://grocerylist-maker.herokuapp.com/items').then((response) => {
            this.props.update('ITEMLIST', response.data)
            console.log("got items");
        })
    };

    emptyList = () => {
        Axios.delete('https://grocerylist-maker.herokuapp.com/clear').then(() => {
            console.log("cleared");
            this.getItems();
            this.clearFields();
        })
    };

    // getNutrition = (food) => {
    //     console.log(food);
    //     Axios.get('https://grocerylist-maker.herokuapp.com/nutrition',
    //         {
    //             params: {
    //                 food: food
    //             }
    //         }).then((response) => {
    //             console.log(response);
    //             console.log(response.data.parsed[0].food.nutrients);
    //             if(response.status === 200){
    //                 this.setNutritionList(response.data.parsed[0].food.nutrients);
    //             }
    //         })
    // };

    sendList = () => {
        Axios.post('https://grocerylist-maker.herokuapp.com/send', this.props.itemList).then(() => {
            console.log("sent items");
        })
    };

    componentDidMount() {
        this.getItems();
        this.clearFields();
    }

    render() {
        return <div className='main-container'>
            <Typography variant="h1" color="secondary">
                Welcome Soma!
            </Typography>
            <div className="buttonsGroup">
                <Button className="buttonInsideGroup" variant="contained" onClick={this.handleOpen} startIcon={<AddIcon />}>Add Item</Button>
                <Button className="buttonInsideGroup" variant="contained" onClick={this.emptyList} startIcon={<ClearAllIcon />}>Clear List</Button>
                <Button className="buttonInsideGroup" variant="contained" onClick={this.sendList} startIcon={<SendIcon />} >Send List</Button>
            </div>
            <div className='groceryItemsContainer'>
                <Dialog open={this.state.open} onClose={() => this.handleClose()}>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogContent>
                        <div className="fields">
                            <TextField
                                label="Item"
                                variant="outlined"
                                margin="dense"
                                type="text"
                                onChange={(event) => {
                                    this.props.update('ITEM', event.target.value)
                                }} />
                            <TextField
                                label="Amount"
                                type="text"
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={(event) => {
                                    this.props.update('AMOUNT', event.target.value)
                                }} />
                            <TextField label="Store"
                                variant="outlined"
                                type="text"
                                margin="dense"
                                onChange={(event) => {
                                    this.props.update('STORE', event.target.value)
                                }} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.addItem()} variant="contained" >Add Item</Button>
                    </DialogActions>
                </Dialog>
                <div className="groceryList">
                    {this.props.itemList.map((val, key) => {
                        return <div className="groceryItem">
                            <ItemCard 
                            deleteItem={() => this.deleteItem(val.id)} 
                            id={val.id} 
                            item={val.item} 
                            amount={val.amount} 
                            store={val.store}
                            />
                        </div>
                    })}
                </div>
            </div>
        </div>
    }

}

// Function to map the state to props  
function mapStateToProps(state) {
    return {
        item : state.item,
        amount : state.amount,
        store : state.store,
        itemList: state.itemList,
    };
}

// Function to map the actions to props 
const mapDispatchToProps = (dispatch) => {
    return {
      update: (field, value) => dispatch(update(field, value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(GroceryList);