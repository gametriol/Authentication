import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static(path.join(__dirname, "dist")));


app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const usernameResult = await db.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );
    if (usernameResult.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const emailResult = await db.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );
    if (emailResult.rows.length > 0) {
      return res.status(409).json({ error: "Email already in Use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(password);
  const result = await db.query(
    "SELECT password FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length > 0) {
    const pass = result.rows[0].password;
    const isValid = await bcrypt.compare(password, pass);
    if (isValid) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } else {
    res.status(404).send("User not found");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
