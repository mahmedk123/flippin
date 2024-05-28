import React, { useState, useEffect } from 'react';
import Nav from '../src/components/Nav';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

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
      setMenuItems(data); // Assuming data is an array of objects with foodName and foodPrice properties
      console.log(data); // Log the fetched data to the console
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      <Nav />
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.foodname}, <strong>Price:</strong> £{item.foodprice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuPage;
