import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
      
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
    res.status(405).end('Method Not Allowed');
  }
}
