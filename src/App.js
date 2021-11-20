import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [store, setStore] = useState("");
  const [itemList, setItemList] = useState([]);

  const addItem = () => {
    Axios.post('https://grocerylist-maker.herokuapp.com/create', {
      item: item,
      amount: amount,
      store: store
    }).then(() => {
      console.log("success");
      getItems();
      setItem("");
      setAmount("");
      setStore("");
    })
  };

  const getItems = () => {
    Axios.get('https://grocerylist-maker.herokuapp.com/items').then((response) => {
      setItemList(response.data);
    })
  };

  const emptyList = () => {
    Axios.delete('https://grocerylist-maker.herokuapp.com/clear').then(() => {
      console.log("cleared");
    })
  };
  const sendList = () => {
    Axios.post('https://grocerylist-maker.herokuapp.com/send', itemList).then(() => {
      console.log("sent items");
    })
  };

  useEffect(() => {
    getItems();
  });
  return (
    <div className="App">
      <div className="fields">
        <div className="inputField">
          <label>Item:</label>
          <input type="text"
            onChange={(event) => {
              setItem(event.target.value)
            }} />
        </div>
        <div className="inputField">
          <label>Amount:</label>
          <input type="number" onChange={(event) => {
            setAmount(event.target.value)
          }} />
        </div>
        <div className="inputField">
          <label>Store:</label>
          <input type="text"
            onChange={(event) => {
              setStore(event.target.value)
            }} />
        </div>
        <button onClick={addItem}>Add Item</button>
      </div>
      <div className="groceryList">
        <div className="headings">
          <div className="item">Item</div>
          <div className="amount">Amount</div>
          <div className="store">Store</div>
        </div>
        {itemList.map((val, key) => {
          return <div className="groceryItem">
            <div className="item">{val.item}</div>
            <div className="amount">{val.amount}</div>
            <div className="store">{val.store}</div>
          </div>
        })}
        <div className="clearButton">
          <button onClick={emptyList}>Clear List</button>
          <button onClick={sendList}>Send List</button>
        </div>
      </div>
    </div>
  );
}

export default App;
