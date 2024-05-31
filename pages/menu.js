import React, { useState, useEffect } from 'react';
import Nav from '../src/components/Nav';
import { useUser } from '@clerk/nextjs';
import Layout from '../src/components/Layout';

const categories = [
  { label: 'Chicken Burgers', type: 'chickenBurgers' },
  { label: 'Smash Burgers', type: 'smashburgers' },
  { label: 'Wraps', type: 'wraps' },
  { label: 'Wings', type: 'wings' },
  { label: 'Chicken', type: 'chicken' },
  { label: 'Sizzlers', type: 'sizzlers' },
  { label: 'Hot Dogs', type: 'hotdogs' },
];

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState({});
  const [newItems, setNewItems] = useState(
    categories.reduce((acc, category) => {
      acc[category.type] = { name: '', price: '', description: '', type: category.type };
      return acc;
    }, {})
  );
  const user = useUser();

  useEffect(() => {
    categories.forEach(({ type }) => fetchMenuData(type));
  }, []);

  const fetchMenuData = async (type) => {
    try {
      const res = await fetch(`/api/menuItem?type=${type}`);
      if (!res.ok) {
        throw new Error('Failed to fetch menu data');
      }
      const data = await res.json();
      setMenuItems((prev) => ({ ...prev, [type]: data }));
    } catch (error) {
      console.error(`Error fetching menu data for ${type}:`, error);
      setMenuItems((prev) => ({ ...prev, [type]: [] }));
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    setNewItems((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value },
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const newItem = newItems[type];

    try {
      const res = await fetch('/api/menuItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) {
        throw new Error(`Failed to add ${type}`);
      }
      fetchMenuData(type);
      setNewItems((prev) => ({
        ...prev,
        [type]: { name: '', price: '', description: '', type },
      }));
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  return (
    <div className="menu-container">
      <h1 className="menu-heading">Menu</h1>
      <Nav />
      {categories.map(({ label, type }) => (
        <div key={type}>
          <h2>{label}</h2>
          <ul>
            {(menuItems[type] || []).map((item, index) => (
              <li key={index}>
                <strong>Name:</strong> {item.foodname}, <strong>Price:</strong> ${item.foodprice}, <strong>Description:</strong> {item.description} <span>- Delicious!</span>
              </li>
            ))}
          </ul>
          {user.isSignedIn && (
            <form onSubmit={(e) => handleSubmit(e, type)}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newItems[type].name}
                  onChange={(e) => handleInputChange(e, type)}
                  placeholder="Enter item name"
                  required
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="text"
                  name="price"
                  value={newItems[type].price}
                  onChange={(e) => handleInputChange(e, type)}
                  placeholder="Enter item price"
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={newItems[type].description}
                  onChange={(e) => handleInputChange(e, type)}
                  placeholder="Enter item description"
                  required
                />
              </div>
              <button type="submit">Add {label}</button>
            </form>
          )}
        </div>
      ))}
      <style jsx>{`
        .menu-container {
          text-align: center;
        }
        .menu-heading {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default MenuPage;
