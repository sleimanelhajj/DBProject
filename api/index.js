import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";

const app = express();

// For ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a connection to the database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sleimanelhajj2004",
  database: "REALESTATE",
});

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Allow requests from your frontend
  })
);

//
// --------------------------- LOGIN ENDPOINT ---------------------------
//
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const [rows] = await connection.execute(
      `SELECT seller_id, email, password FROM sellers WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Seller not found." });
    }

    const seller = rows[0];

    if (seller.password === password) {
      // Return seller_id in the response
      return res.status(200).json({
        message: "Login successful",
        seller_id: seller.seller_id,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Failed to log in." });
  }
});

//
// ---------------------- REGISTER ENDPOINT -----------------------
//
app.post("/register", async (req, res) => {
  const {
    name,
    email,
    phone_number,
    address,
    date_of_birth,
    home_renovation_history,
    password,
  } = req.body;

  try {
    const query = `INSERT INTO sellers (name, email, phone_number, address, date_of_birth, home_renovation_history, password)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await connection.execute(query, [
      name,
      email,
      phone_number,
      address,
      date_of_birth,
      home_renovation_history,
      password,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

//
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
// ------------------ ADD PROPERTY ENDPOINT --------------------
//
app.post("/add-property", async (req, res) => {
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
    property_status,
    description,
    photos,
  } = req.body;

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
    !property_status
  ) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  try {
    const formattedDate = new Date(listing_date).toISOString().split("T")[0];

    const query = `
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
                property_status,
                description,
                photos
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await connection.execute(query, [
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
      property_status,
      description || null,
      photos || null,
    ]);

    res.status(201).json({ message: "Property added successfully." });
  } catch (err) {
    console.error("Error adding property:", err);
    res.status(500).json({ error: "Failed to add property." });
  }
});


// ------------------ ADD PROPERTY ENDPOINT --------------------
app.post("/add-property", async (req, res) => {
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
      property_status,
      description,
      photos, // Array of base64 images
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
      !property_status
    ) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }
  
    try {
      const formattedDate = new Date(listing_date).toISOString().split("T")[0];
  
      // Insert property into the `properties` table
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
          property_status, 
          description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          property_status,
          description || null,
        ]
      );
  
      const propertyId = result.insertId; // Get the ID of the inserted property
  
      // Insert property images into the `property_images` table
      if (photos && photos.length > 0) {
        const imagePromises = photos.map((photo) =>
          connection.execute(
            `INSERT INTO property_images (property_id, image_data) VALUES (?, ?)`,
            [propertyId, photo]
          )
        );
        await Promise.all(imagePromises); // Wait for all image inserts
      }
  
      res.status(201).json({ message: "Property added successfully." });
    } catch (err) {
      console.error("Error adding property:", err);
      res.status(500).json({ error: "Failed to add property." });
    }
  });


// --------------------------- LOGOUT ENDPOINT ---------------------------
app.post("/logout", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header
  
      if (!token) {
        return res.status(400).json({ error: "Token is required for logout." });
      }
  
      // Example: Add token to a blacklist (use a database or in-memory store like Redis)
      // Here, you could save the token with an expiration time
      await blacklistToken(token);
  
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.error("Error during logout:", err);
      res.status(500).json({ error: "Failed to log out." });
    }
  });
  
  // Example function to blacklist a token (you'll need to implement storage logic)
  async function blacklistToken(token) {
    // Add token to a blacklist storage, e.g., a database or Redis
    console.log("Token blacklisted:", token);
  }
  
  


  
  

// ------------------- SERVER START ---------------------
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
