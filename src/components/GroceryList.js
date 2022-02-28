import React, { Component } from 'react';
import { Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SendIcon from '@mui/icons-material/Send';
import Axios from 'axios';
import ItemCard from './ItemCard';


class GroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            item: '',
            amount: '',
            store: '',
            itemList: [],
        };
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => this.setState({ open: false });
    setStore = (store) => this.setState({ store: store });
    setAmount = (amount) => this.setState({ amount: amount });
    setItem = (item) => this.setState({ item: item });
    setItemList = (itemList) => this.setState({ itemList: itemList });

    addItem = () => {
        if (this.state.item === "" || this.state.amount === 0 || this.state.store === "") {
            return;
        }
        Axios.post('http://localhost:3001/create', {
            item: this.state.item,
            amount: this.state.amount,
            store: this.state.store
        }).then(() => {
            console.log("success");
            this.clearFields();
            this.getItems();
            this.handleClose();
        })
    };

    clearFields = () => {
        this.setItem("");
        this.setAmount("");
        this.setStore("");
    }

    deleteItem = (id) => {
        console.log("Delete Function: " + id);
        Axios.delete('http://localhost:3001/delete', {
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
        Axios.get('http://localhost:3001/items').then((response) => {
            this.setItemList(response.data);
            console.log("got items");
        })
    };

    emptyList = () => {
        Axios.delete('http://localhost:3001/clear').then(() => {
            console.log("cleared");
            this.getItems();
            this.clearFields();
        })
    };

    // getNutrition = (food) => {
    //     console.log(food);
    //     Axios.get('http://localhost:3001/nutrition',
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
        Axios.post('http://localhost:3001/send', this.state.itemList).then(() => {
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
                                    this.setItem(event.target.value)
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
                                    this.setAmount(event.target.value)
                                }} />
                            <TextField label="Store"
                                variant="outlined"
                                type="text"
                                margin="dense"
                                onChange={(event) => {
                                    this.setStore(event.target.value)
                                }} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.addItem()} variant="contained" >Add Item</Button>
                    </DialogActions>
                </Dialog>
                <div className="groceryList">
                    {this.state.itemList.map((val, key) => {
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

export default GroceryList;