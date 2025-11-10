import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { PRODUCTS } from "./products.js";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "DB" (replace with Mongo later if desired)
const users = []; // {id, name, email, passHash}
const SECRET = "dev-secret"; // for demo only

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, { expiresIn: "2h" });
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Auth
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  if (users.find(u => u.email === email)) return res.status(409).json({ message: "Email exists" });
  const passHash = await bcrypt.hash(password, 10);
  const user = { id: uuid(), name, email, passHash };
  users.push(user);
  res.json({ token: createToken(user), user: { id: user.id, name, email } });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ token: createToken(user), user: { id: user.id, name: user.name, email } });
});

app.get("/api/me", auth, (req, res) => {
  res.json({ user: req.user });
});

// Products
app.get("/api/products", (req, res) => {
  res.json({ items: PRODUCTS });
});

app.get("/api/products/:id", (req, res) => {
  const item = PRODUCTS.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ item });
});

// Search across name, category, description
app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  if (!q) return res.json({ items: PRODUCTS });
  const items = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
  res.json({ items });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API ready on http://localhost:" + PORT));
