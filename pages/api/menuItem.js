import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price, description } = req.body;
    const { type } = req.query;

    if (!name || !price || !description) {
      return res.status(400).json({ error: 'Name, price, and description are required' });
    }

    if (!type) {
      return res.status(400).json({ error: 'Type is required' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
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
    const { type } = req.query;

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
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end('Method Not Allowed');
  }
}
