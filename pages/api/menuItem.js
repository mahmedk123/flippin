import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price } = req.body;
    if (!name || !price) {
      throw new Error('Failed to add {name}');
      
    }
    

    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      const result = await sql`
        INSERT INTO test (foodName, foodPrice) 
        VALUES (${name}, ${price})
        RETURNING *
      `;
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
   
  }
  if (req.method === 'GET') {
    try {
      const result = await sql`
        SELECT * FROM test
      `;
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Your existing code for handling POST requests
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
