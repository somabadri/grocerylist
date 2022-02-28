import './App.css';
import { capitalize } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroceryList from './components/GroceryList'

function App() {
  let theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#356859',
      },
      primarysecond: {
        main: '#37966F',
      },
      primarythird: {
        main: '#B9E4C9',
      },
      secondary: {
        main: '#fd5523',
      },
      background: {
        main: '#FFFBE6',
      },
    },
    typography: {
      h1: {
        fontFamily: 'Montserrat',
        fontSize: 96,
        fontWeight: 600,
      },
      h2: {
        fontFamily: 'Montserrat',
        fontSize: 60,
        fontWeight: 600,
      },
      h3: {
        fontFamily: 'Montserrat',
        fontSize: 48,
        fontWeight: 600,
      },
      h4: {
        fontFamily: 'Montserrat',
        fontSize: 34,
        fontWeight: 600,
      },
      h5: {
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: 500,
      },
      h6: {
        fontFamily: 'Lekton',
        fontSize: 21,
        fontWeight: 700,
      },
      subtitle1: {
        fontFamily: 'Lekton',
        fontSize: 21,
        fontWeight: 700,
      },
      subtitle2: {
        fontFamily: 'Lekton',
        fontSize: 15,
        fontWeight: 700,
      },
      body1: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        fontWeight: 600,
      },
      body2: {
        fontFamily: 'Montserrat',
        fontSize: 14,
      },
      button: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 700,
        textTransform: capitalize,
      },
      caption: {
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontWeight: 500,
      },
      overline: {
        fontFamily: 'Montserrat',
        fontSize: 10,
        textTransform: capitalize,
      },
    },
  });

  const itemListMock = [
    { amount: 1, store: "Store 1", item: "Item 1" },
    { amount: 2, store: "Store 2", item: "Item 2" },
    { amount: 3, store: "Store 3", item: "Item 3" },
    { amount: 3, store: "Store 3", item: "Item 3" },
    { amount: 3, store: "Store 3", item: "Item 3" },
    { amount: 3, store: "Store 3", item: "Item 3" },
    { amount: 3, store: "Store 3", item: "Item 3" },
    { amount: 3, store: "Store 3", item: "Item 3" },
  ]

  // https://grocerylist-maker.herokuapp.com/
  // function addItem(){
  //   Axios.post('http://localhost:3001/create', {
  //     item: item,
  //     amount: amount,
  //     store: store
  //   }).then(() => {
  //     console.log("success");
  //     getItems();
  //     setItem("");
  //     setAmount("");
  //     setStore("");
  //     handleClose();
  //   })
  // };

  // function getItems(){
  //   Axios.get('http://localhost:3001/items').then((response) => {
  //     setItemList(response.data);
  //   })
  // };

  // function emptyList(){
  //   Axios.delete('http://localhost:3001/clear').then(() => {
  //     console.log("cleared");
  //   })
  // };

  // function sendList(){
  //   Axios.post('http://localhost:3001/send', itemList).then(() => {
  //     console.log("sent items");
  //   })
  // };

  // useEffect(() => {
  //    getItems();
  // });

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const [item, setItem] = useState("");
  // const [amount, setAmount] = useState(0);
  // const [store, setStore] = useState("");
  // const [itemList, setItemList] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GroceryList/>
      </div>
      {/* <div className="App">
        <div className='main-container'>
          <Typography variant="h1" color="secondary">
            Welcome Soma!
          </Typography>
          <div className="buttonsGroup">
            <Button className="buttonInsideGroup" variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>Add Item</Button>
            <Button className="buttonInsideGroup" variant="contained" onClick={emptyList} startIcon={<ClearAllIcon />}>Clear List</Button>
            <Button className="buttonInsideGroup" variant="contained" onClick={() => sendList} startIcon={<SendIcon />} >Send List</Button>
          </div>
          <div className='groceryItemsContainer'>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Item</DialogTitle>
              <DialogContent>
                <div className="fields">
                  <TextField
                    label="Item"
                    variant="outlined"
                    margin="dense"
                    type="text"
                    onChange={(event) => {
                      setItem(event.target.value)
                    }} />
                  <TextField
                    label="Amount"
                    type="number"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    onChange={(event) => {
                      setAmount(event.target.value)
                    }} />
                  <TextField label="Store"
                    variant="outlined"
                    type="text"
                    margin="dense"
                    onChange={(event) => {
                      setStore(event.target.value)
                    }} />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => addItem()} variant="contained" >Add Item</Button>
              </DialogActions>
            </Dialog>
            <div className="groceryList">
              {itemList.map((val, key) => {
                return <div className="groceryItem">
                  <ItemCard id={val.id} item={val.item} amount={val.amount} store={val.store} />
                </div>
              })}
            </div>
          </div>
        </div>
      </div> */}
    </ThemeProvider>
  );
}

export default App;
