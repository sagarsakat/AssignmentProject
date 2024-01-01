import express from 'express';
import pg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'client_server_database',
  password: 'root',
  port: 5432,
});

const saltRounds = 10; // Define the number of salt rounds for bcrypt

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = "INSERT INTO login(name, email, password) VALUES($1, $2, $3)";
    const values = [name, email, hashedPassword];

    await pool.query(sql, values);
    return res.json({ status: "Success" });
  } catch (err) {
    return res.status(500).json({ error: "Error registering user" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM login WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, 'your_secret_key');
    res.cookie('token', token, { httpOnly: true });

    return res.json({ status: "Success", token });
  } catch (err) {
    return res.status(500).json({ error: "Error logging in" });
  }
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});



