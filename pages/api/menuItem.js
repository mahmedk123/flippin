import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST requests for creating a new menu item
    const { name, price, description } = req.body;
    const { type } = req.query;

    // Check if required fields are provided
    if (!name || !price || !description || !type) {
      return res.status(400).json({ error: 'Name, price, description, and type are required' });
    }

    try {
      const result = await sql`
        INSERT INTO test (foodName, foodPrice, foodType, description) 
        VALUES (${name}, ${price}, ${type}, ${description})
        RETURNING *
      `;
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    // Handle GET requests for fetching menu items
    const { type } = req.query;

    // Check if required query parameter is provided
    if (!type) {
      return res.status(400).json({ error: 'Type is required' });
    }

    try {
      const result = await sql`
        SELECT * FROM test WHERE foodType = ${type}
      `;
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE requests for deleting a menu item
    const { name } = req.query;

    // Check if required query parameter is provided
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const result = await sql`
        DELETE FROM test WHERE foodName = ${name}
        RETURNING *
      `;
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error deleting menu item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end('Method Not Allowed');
  }
}
