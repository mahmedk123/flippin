import React, { useState, useEffect } from 'react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newChickenBurger, setNewChickenBurger] = useState({ name: '', price: '' });
  const [newPizza, setNewPizza] = useState({ name: '', price: '' });

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const res = await fetch('/api/menuItem');
      if (!res.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await res.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e, newItem, setState) => {
    e.preventDefault();
    const { name, price } = newItem;

    try {
      const res = await fetch('/api/menuItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price }), // Send both name and price fields
      });
      if (!res.ok) {
        throw new Error('Failed to add item');
      }
      // Refresh menu data after adding item
      fetchMenuData();
      // Reset newItem state
      setState({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h1>Menu</h1>

      <form onSubmit={(e) => handleSubmit(e, newChickenBurger, setNewChickenBurger)}>
        <h2>Chicken Burgers</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newChickenBurger.name}
            onChange={(e) => handleInputChange(e, setNewChickenBurger)}
            placeholder="Enter item name"
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newChickenBurger.price}
            onChange={(e) => handleInputChange(e, setNewChickenBurger)}
            placeholder="Enter item price"
          />
        </div>
        <button type="submit">Add Chicken Burger</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e, newPizza, setNewPizza)}>
        <h2>Pizza</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newPizza.name}
            onChange={(e) => handleInputChange(e, setNewPizza)}
            placeholder="Enter item name"
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newPizza.price}
            onChange={(e) => handleInputChange(e, setNewPizza)}
            placeholder="Enter item price"
          />
        </div>
        <button type="submit">Add Pizza</button>
      </form>

      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.foodName}, <strong>Price:</strong> ${item.foodPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
