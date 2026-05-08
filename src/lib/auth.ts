import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET || "enflix-super-secret-key-change-in-production";
const DATA_DIR =
  process.env.DATA_DIR ||
  process.env.ENFLIX_DATA_DIR ||
  (process.env.NODE_ENV === "production"
    ? "/tmp/enflix-data"
    : path.join(process.cwd(), "data"));
const USERS_FILE = path.join(DATA_DIR, "users.json");

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

function getUsers(): User[] {
  try {
    const dir = path.dirname(USERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, "[]");
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  const dir = path.dirname(USERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<SafeUser> {
  const users = getUsers();

  if (users.find((u) => u.email === email)) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const avatarColors = ["E50914", "B81D24", "221F1F", "F5F5F1", "564D4A"];
  const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password: hashedPassword,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=128`,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveUsers(users);

  return { id: user.id, name: user.name, email: user.email, avatar: user.avatar };
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<SafeUser> {
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  return { id: user.id, name: user.name, email: user.email, avatar: user.avatar };
}

export function generateToken(user: SafeUser): string {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): SafeUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(decoded.name)}&background=E50914&color=fff&size=128`,
    };
  } catch {
    return null;
  }
}
