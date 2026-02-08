import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

// This connects to the database I made in TablePlus
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vitalflow',
  password: 'admin123',
  port: 5432,
});

app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`VitalFlow Engine is Online! DB Time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("Server is up, but Database is not connected.");
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

