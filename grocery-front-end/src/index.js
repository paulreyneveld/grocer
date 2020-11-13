import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/button';
import Form from 'react-bootstrap/form';

// Ultimately, I'd like to abstract this list to the DB with a frontend that allows users to update the commons items.
const commonItems = [
  "Bacon",
  "Eggs",
  "Cereal",
  "Greens",
  "Cheese",
  "Chips",
  "Coffee",
  "Tea",
  "Cream Cheese",
  "Deli Meats",
  "Cured Meats",
  "Bread",
  "Bagels",
  "Ice Cream",
  "Pasta",
  "Red Sauce",
  "White Sauce"
]

/// DETERMINES WHERE AXIOS QUERIES INFO ///
const baseUrl = '/api'

const App = () => {
  const [newItem, setNewItem] = useState('')
  const [groceryList, setGroceryList] = useState([])

  const getGroceryList = async () => {
    const list = await axios.get(baseUrl)
    setGroceryList(groceryList.concat(list.data))
  }

  useEffect(() => getGroceryList(), [])

  const handleNewItem = (event) => {
    console.log(event.target.value)
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
    <Form onSubmit={addCustomItem}>
      <Form.Group controlId="formAddItem">
        <Form.Control value={newItem} type="item" placeholder="Enter grocery item" onChange={handleNewItem} />
      </Form.Group>
      <Button variant="dark" size="lg" type="submit" block>
        Add Item
      </Button>
    </Form>
    <br />
    
    {commonItems.map(item => {
      return <Button variant="dark" size="lg" className="commonItems" onClick={addCommonItem} block>{item}</Button>
    })}

    <h1 className="margin-fix">Grocery List</h1>
    {groceryList.map(item => {
      return <h5 key={item.id}>{item.item} <Button variant="dark" size="lg" onClick={() => deleteItem(item.id)}>Delete</Button></h5>
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


