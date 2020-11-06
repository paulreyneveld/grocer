import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './custom.css';

/// DETERMINES WHERE AXIOS QUERIES INFO ///
const baseUrl = 'http://localhost:3001/api'

const App = () => {
  const [newItem, setNewItem] = useState('')
  const [groceryList, setGroceryList] = useState([])

  const getGroceryList = async () => {
    const list = await axios.get(baseUrl)
    setGroceryList(groceryList.concat(list.data))
  }

  useEffect(() => getGroceryList(), [])

  const handleNewItem = (event) => {
    setNewItem(event.target.value)
  }

  const addCustomItem = async (event) => {
    event.preventDefault()
    const newGroceryItem = {
      item: newItem,
    }
    const response = await axios.post(baseUrl, newGroceryItem)
    newGroceryItem.id = response.data.id
    setGroceryList(groceryList.concat(newGroceryItem))
    setNewItem('')
  }

  const addCommonItem = async (event) => {
    console.log(event.target.innerText)
    const newGroceryItem = {
      item: event.target.innerText,
    }
    const response = await axios.post(baseUrl, newGroceryItem)
    newGroceryItem.id = response.data.id
    setGroceryList(groceryList.concat(newGroceryItem))
  }

  const deleteItem = async (id) => {    
    const updatedList = groceryList.filter(item => item.id !== id)
    setGroceryList(updatedList)
    await axios.delete(`${baseUrl}/${id}`)
  }

  return (
    <div className="container">
    <form onSubmit={addCustomItem}>
      <label>Item: </label>
      <input value={newItem} onChange={handleNewItem} />
      <button type="submit">Add item</button>
    </form>
    <button className="commonItems" onClick={addCommonItem}>Bacon</button>
    <button className="commonItems" onClick={addCommonItem}>Eggs</button>
    <button className="commonItems" onClick={addCommonItem}>Cereal</button>
    <button className="commonItems" onClick={addCommonItem}>Greens</button>
    <button className="commonItems" onClick={addCommonItem}>Cheese</button>
    <button className="commonItems" onClick={addCommonItem}>Chips</button>
    <button className="commonItems" onClick={addCommonItem}>Coffee</button>
    <button className="commonItems" onClick={addCommonItem}>Tea</button>
    <button className="commonItems" onClick={addCommonItem}>Cream Cheese</button>
    <button className="commonItems" onClick={addCommonItem}>Deli Meats</button>
    <button className="commonItems" onClick={addCommonItem}>Cured Meats</button>
    <button className="commonItems" onClick={addCommonItem}>Bread</button>
    <button className="commonItems" onClick={addCommonItem}>Bagels</button>

    <h1>Grocery List</h1>
    {groceryList.map(item => {
      return <p key={item.id}>{item.item} <button onClick={() => deleteItem(item.id)}>Delete</button></p>
    })}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


