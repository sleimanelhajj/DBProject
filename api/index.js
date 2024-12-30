import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import multer from "multer";
import fs from "fs";
import cookieParser from "cookie-parser";
import session  from 'express-session';

const app = express();

// For ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a connection to the database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "realestater",
  port: 3306
});



// Middleware   --> to fix payloads limits
app.use(express.json({ limit: "100mb" })); // Increase the JSON payload limit
app.use(express.urlencoded({ limit: "100mb", extended: true })); // Increase URL-encoded payload limit
app.use(cookieParser()); // Use cookie-parser
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000", // Allow requests from your frontend
    
  })
);
app.use(session({
  secret: 'AliYassine', // Use a secure secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure:false,maxAge: 24 * 60 * 60 * 1000 }, // 1 day
}));
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
  var typee='no';
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
      const sellerId= seller['id'];
      const sellerName= seller['name']
      typee= 'seller';
      const user = { id: sellerId, name: sellerName,userType:typee };

    // Set user data in a cookie (sign it if needed)
    res.cookie('userData', JSON.stringify(user), {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: false, // Set to `true` in production over HTTPS
    });
       return  res.json({
        success: true,
        user: {
          id: seller.id,
          name: seller.name,
          email: seller.email,
          userType: typee

        },
        message: "Login successful. Cookie set.",
      });
    }
    console.log('testtest')
    const [clientResult] = await connection.query(
      `SELECT * FROM clients WHERE email = ? AND password = ?`,
      [email, password])
    if (clientResult.length > 0) {
      const client = clientResult[0];
      const clientId= client['Id'];
      const clientName= client['name']
      typee= 'client';
      const user = { id: clientId, name: clientName,userType:typee };
      console.log('testtest')

    // Set user data in a cookie (sign it if needed)
    res.cookie('userData', JSON.stringify(user), {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: false, // Set to `true` in production over HTTPS
    });
       return  res.json({
        success: true,
        user: {
          id: client.id,
          name: client.name,
          email: client.email,
          userType: typee
        },
        message: "Login successful. Cookie set.",
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

app.post("/ReserveProperty", async (req,res)=>{
  const Propertyid = req.body['propertyId']
  const cookk= await JSON.parse(req.cookies['userData'])
  const clientID= cookk.id

// 93 {"id":2,"name":"Ali Yassine","userType":"seller"}  
  await connection.query('insert into reserve values (?, ?)',[clientID,Propertyid])
 

return res.json({ success: true })


  
});
app.get("/check-session", async (req, res) => {
  const cookk= await req.cookies
  if (cookk['userData']) {
    res.json({ success: true, user: JSON.parse(cookk['userData']) });
  } else {
    res.json({ success: false, message: "No active session." });
  }
});

app.get('/user/userProperties',async (req,res)=>{
  console.log(req.query)
  const userId=req.query.id
  console.log(userId)
  var allProperties=[0,0]
  if(userId!=null){
     allProperties = await connection.query('select * from properties where sellerId=?',[userId])}
  
  else{
     allProperties=[1,1]
  }
  return res.json({properties:allProperties[0]});
});
app.get('/getReservedProperties',async (req,res)=>{
  console.log(req.query)
  const userId=req.query.id
  console.log(userId)
  var allProperties=[0,0]
  if(userId!=null){
   allProperties = await connection.query('select * from properties,reserve where propertyid=id and clientid=?',[userId])}
  
  else{
     allProperties=[1,1]
  }
  return res.json({properties:allProperties[0]});
});
//


app.get('/getAliYassine',async (req,res)=>{
  console.log(req.query)
  const userId=req.query.id
  console.log(userId)
  var allProperties=[0,0]
  if(userId!=null){
   allProperties = await connection.query('select * from properties where sellerId=?',[userId])}
  
  else{
     allProperties=[1,1]
  }
  return res.json({properties:allProperties[0]});
});


//

app.post('/contactFill', async (req,res) =>{
const {fullName,email,message,}=req.body
await connection.query("Insert into contactus (name,email,message) values (?,?,?)",[fullName,email,message])
return res.json({success:true});
});
// GET route to fetch property details by ID
app.get('/property/details/:id', async (req, res) => {
  const { id } = req.params; // Get the property ID from the URL params
console.log(req.params)
const property = await connection.query('select * from properties where id=?',[id])
console.log(property[0][0])
  if (property) {
    return res.json(property); // Return the found property as JSON
  } else {
    res.status(404).json({ message: 'Property not found' }); // Return a 404 if not found
  }
});
//
app.post("/deleteProperty", async (req,res)=>{
  const Propertyid = req.body['propertyId']
  console.log(Propertyid)
// 93 {"id":2,"name":"Ali Yassine","userType":"seller"}  
  await connection.query('delete from properties where id=?',[Propertyid])

return res.json({ success: true })


  
});
//
app.get("/getSellersandClients",async(req,res) =>{
const queryClients='SELECT  (SELECT COUNT(*) FROM   clients) AS clients,(SELECT COUNT(*)FROM   sellers) AS sellers FROM    dual';

// const clientCount = await connection.query(querySellers)
const Counts = await connection.query(queryClients)

console.log(Counts[0][0])
return res.json(Counts[0][0])

});
app.post("/logout",async(req, res)=>{
  // Clear all cookies
  Object.keys(req.cookies).forEach((cookie) => {
    res.clearCookie(cookie, { path: "/" });
  });

  res.send("All cookies cleared!");
});
app.get("/getOptions", async(req,res)=>{
  const [options]= await connection.query("select * from availableCities")
  var listOfItems=[]
  for(let x=0;x<options.length;x++){
  listOfItems.push(options[x].AvailableCities)
}
res.send(listOfItems)  
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

app.get("/AllHouses", async(req,res) => {
  const userCookie = req.cookies.user;
  console.log(userCookie)

  //const user = JSON.parse(userCookie);  
  const query = `
   select * from properties where id=? values (?)
  `;

  //const data= await connection.query(query, req.user.id)
});

app.get('/searchProperties', async (req, res) => {
  let queryy = 'SELECT * FROM properties WHERE 1=1'; // Start with a base query
  const values = [];
  
  const property_type = req.query.type && req.query.type.trim() !== "" ? req.query.type : null;
  const city = req.query.city_name && req.query.city_name.trim() !== "" ? req.query.city_name : null;
  const square_feet = req.query.min_area && req.query.min_area.trim() !== "" ? parseInt(req.query.min_area, 10) : null;
  const price = req.query.max_price && req.query.max_price.trim() !== "" ? parseFloat(req.query.max_price) : null;

  if (property_type) {
    queryy += ' AND property_type = ?';
    values.push(property_type);
  }

  if (city) {
    queryy += ' AND city = ?';
    values.push(city);
  }

  if (square_feet !== null) {
    queryy += ' AND square_feet > ?';
    values.push(square_feet);
  }

  if (price !== null) {
    queryy += ' AND price < ?';
    values.push(price);
  }

  try {
    const [data] = await connection.query(queryy, values);
    return res.json(data);
  } catch (error) {
    console.error('Database query failed:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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
      `SELECT * FROM sellers WHERE id = ?`,
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
      `UPDATE sellers SET name = ?, email = ?, phone_number = ?, address = ?, date_of_birth = ? WHERE id = ?`,
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
  var {
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
    seller
  } = req.body;
console.log(property_type,
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
  seller)
  // Validate required fields
  if (
    !property_type ||
    !address ||
    !city ||
    !state ||
    !zip_code ||
    !square_feet ||
    !price ||
    !listing_date ||
    !description ||
    !seller
  ) {
    console.log('bedrooms',bedrooms)
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  if(property_type=="land"){
bedrooms=0
bathrooms=0
  }
  try {
    const formattedDate = new Date(listing_date).toISOString().split("T")[0];
  //     const userId=user['id']
  //   // Insert Home into the `properties` table
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
        description,
        sellerId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
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
        seller]
    );

    const propertyId = result.insertId; // Get the ID of the inserted property

    // Insert image paths into the `property_images` table
    if (req.files && req.files.length > 0) {
      // Create an array of image paths
      const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

      // Insert the array into the database
      await connection.execute(
        `INSERT INTO property_images (property_id, image_paths) VALUES (?, ?)`,
        [propertyId, JSON.stringify(imagePaths)]
      );
    }

    res.status(201).json({ message: 'Property and images added successfully.' });
  } catch (err) {
    console.error('Error adding property:', err);
    res.status(500).json({ error: 'Failed to add property.' });
  }
});



// ------------------- SERVER START ---------------------
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
