import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import multer from "multer";
import fs from "fs";

const app = express();

// For ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a connection to the database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "REALESTATE",
});

// Middleware   --> to fix payloads limits
app.use(express.json({ limit: "100mb" })); // Increase the JSON payload limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Increase URL-encoded payload limit

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Allow requests from your frontend
  })
);

// Set up Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and GIF are allowed."));
    }
  },
});

// --------------------------- LOGIN ENDPOINT ---------------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const [sellerResult] = await connection.query(
      `SELECT * FROM sellers WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (sellerResult.length > 0) {
      const seller = sellerResult[0];
      return res.json({
        success: true,
        userType: "seller",
        user: {
          id: seller.seller_id,
          name: seller.name,
          email: seller.email,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ---------------------- REGISTER SELLER ENDPOINT -----------------------
app.post("/registerSeller", async (req, res) => {
  const {
    name,
    email,
    phone_number,
    address,
    date_of_birth,
    home_renovation_history,
    password,
  } = req.body;

  const query = `
    INSERT INTO sellers 
    (name, email, phone_number, address, date_of_birth, home_renovation_history, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await connection.query(query, [
      name,
      email,
      phone_number,
      address,
      date_of_birth,
      home_renovation_history,
      password,
    ]);

    res.status(201).json({ success: true, message: "Seller registered successfully!" });
  } catch (error) {
    console.error("Error during seller registration:", error);
    res.status(500).json({ success: false, message: "Failed to register seller." });
  }
});

// ---------------------- REGISTER CLIENT ENDPOINT -----------------------
app.post("/registerClient", async (req, res) => {
  const { name, email, phone_number, address, date_of_birth, budget, password } = req.body;

  const query = `
    INSERT INTO clients 
    (name, email, phone_number, address, date_of_birth, budget, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await connection.query(query, [
      name,
      email,
      phone_number,
      address,
      date_of_birth,
      budget,
      password,
    ]);
    res.status(201).json({ success: true, message: "Client registered successfully!" });
  } catch (error) {
    console.error("Error during client registration:", error);
    res.status(500).json({ success: false, message: "Failed to register client." });
  }
});

// ------------------ ACCOUNT DETAILS ENDPOINT --------------------
//
app.get("/account", async (req, res) => {
  const { seller_id } = req.query;

  if (!seller_id) {
    return res.status(400).json({ error: "Seller ID is required." });
  }

  try {
    const [profile] = await connection.execute(
      `SELECT * FROM sellers WHERE seller_id = ?`,
      [seller_id]
    );

    if (profile.length === 0) {
      return res.status(404).json({ error: "Seller not found." });
    }

    res.json({ profile: profile[0] });
  } catch (err) {
    console.error("Error fetching account data:", err);
    res.status(500).json({ error: "Failed to fetch account data" });
  }
});

//
// ------------------ UPDATE PROFILE ENDPOINT --------------------
//
app.post("/update-profile", async (req, res) => {
  let { seller_id, name, email, phone_number, address, date_of_birth } =
    req.body;

  if (!seller_id || !name || !email || !phone_number || !address || !date_of_birth) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const formattedDate = new Date(date_of_birth).toISOString().split("T")[0];

    const [result] = await connection.execute(
      `UPDATE sellers SET name = ?, email = ?, phone_number = ?, address = ?, date_of_birth = ? WHERE seller_id = ?`,
      [name, email, phone_number, address, formattedDate, seller_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Seller not found." });
    }

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

//

// ------------------- ADD PROPERTY WITH FILE UPLOAD --------------------
// Updated `/add-property` endpoint
app.post("/add-property", upload.array("images", 3), async (req, res) => {
  const {
    property_type,
    address,
    city,
    state,
    zip_code,
    bedrooms,
    bathrooms,
    square_feet,
    price,
    listing_date,
    description,
  } = req.body;

  // Validate required fields
  if (
    !property_type ||
    !address ||
    !city ||
    !state ||
    !zip_code ||
    !bedrooms ||
    !bathrooms ||
    !square_feet ||
    !price ||
    !listing_date ||
    !description
  ) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  try {
    const formattedDate = new Date(listing_date).toISOString().split("T")[0];

    // Insert Home into the `properties` table
    const [result] = await connection.execute(
      `
      INSERT INTO properties (
        property_type, 
        address, 
        city, 
        state, 
        zip_code, 
        bedrooms, 
        bathrooms, 
        square_feet, 
        price, 
        listing_date, 
        description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        property_type,
        address,
        city,
        state,
        zip_code,
        bedrooms,
        bathrooms,
        square_feet,
        price,
        formattedDate,
        description || null,
      ]
    );

    const propertyId = result.insertId; // Get the ID of the inserted property

    // Insert image paths into the `property_images` table
    if (req.files && req.files.length > 0) {
      const photoQueries = req.files.map((file) =>
        connection.execute(
          `INSERT INTO property_images (property_id, image_path) VALUES (?, ?)`,
          [propertyId, `/uploads/${file.filename}`]
        )
      );
      await Promise.all(photoQueries);
    }

    res.status(201).json({ message: "Property and images added successfully." });
  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).json({ error: "Failed to add property." });
  }
});


// ------------------- SERVER START ---------------------
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
