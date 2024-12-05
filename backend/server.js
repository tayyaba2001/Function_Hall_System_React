

const express = require("express");
const cors = require('cors');
const mysql = require("mysql2");
// const cors = require("cors");
const multer = require('multer');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
//const bcrypt =require('bcrypt');
const session = require('express-session');
// const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.json({ limit: '64mb' }));
app.use(express.urlencoded({ limit: '64mb', extended: true }));

const cookieParser= require('cookie-parser');
const bodyParser =require('body-parser');
const path = require('path');

const gridfsStream = require('gridfs-stream');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


  app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
  });

  const storage6 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.fieldname}`);
    }
  });

  const upload6 = multer({
    storage: storage6,
    limits: { fileSize: 64 * 1024 * 1024 } // Set 5MB limit for uploads
  });
  
  const storage7 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.fieldname}`);
    }
  });

  const upload7 = multer({
    storage: storage7,
    limits: { fileSize: 64 * 1024 * 1024 } // Set 5MB limit for uploads
  });
  

 // app.use(bcrypt);
 app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL,
  methods:["POST","GET", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

 // Body Parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));

 const salt=10;
 // Express Session middleware
 app.use(session({
   secret: 'secret',   // Replace with a strong secret key
   resave: false,
   saveUninitialized: true,
   cookie: {
     secure: false, // Set this to true in production with HTTPS
     maxAge: 24 * 60 * 60 * 1000 // Cookie expiration set to 1 day
   }
 }))



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "appmysql",
  database: "invent_system",
});
const verifyUser =(req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    return res.status(401).json({ Error: "User not authenticated" });
  }
    else{
  jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
    if(err){
        return res.json({Error:"Token is not okay"});}
    else{
  req.name=decoded.name;
  next();  
    }
  })
  
    }
  }

app.get("/dashboard",verifyUser ,(req, res) => {
  // return res.json("from backendside");
if(req.session.name)
{
  console.log('Session ID:', req.session.id23); 
  return res.json({valid:true,name:req.session.name,id:req.session.id23,role:req.session.role,message:"User registered successfully"});
}
else
{
  return res.json({
    valid: false,
    message: "User not authenticated" // Ensure this message is sent when not authenticated
  });
}
})
app.get("/", (req, res) => {
   return res.json("from backendside");
})
app.get("/users", (req, res) => {
  const q = "SELECT * from users123";
   db.query(q,  (err, result) => {
    if (err) {
      console.error("Error fetching book:", err);
     // res.status(500).json({ error: "Internal server error" });
    } 
      res.json(result);
   })
});

app.get('/logout', (req, res) => {
  // Clear the token cookie
//  res.clearCookie('token'); 
req.session.destroy((err) => {
  if (err) {
    return res.status(500).json({ status: 'error', message: 'Failed to destroy session' });
  }
  
  // Clear the token and session cookie
     // Clear the token cookie
     res.clearCookie('token', { path: '/' });

     // Clear the connect.sid session cookie
     res.clearCookie('connect.sid', { path: '/' });
 
  // Send a response indicating success
  return res.json({ status: 'success', message: 'Logged out successfully' });
});
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const checkEmailQuery = 'SELECT * FROM users123 WHERE email = ?';

  db.query(checkEmailQuery, [email], async (err, result) => {
    if (err) {
      console.error('Database error during email check:', err);
      return res.status(500).json({ message: 'Server error during registration' });
    }

    if (result.length > 0) {
      // Email already exists
      return res.status(409).json({ message: 'Email already exists' });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = 'INSERT INTO users123 (name, email, password) VALUES (?, ?, ?)';

        db.query(sql, [name, email, hashedPassword], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error during registration' });
          }
          res.status(200).json({ message: 'Registration successful' });
        });
      } catch (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ message: 'Error during password encryption' });
      }
    }
  });
});


app.post('/login',(req,res)=>{
  const sqql ="SELECT * FROM users123  WHERE email=? ";
  db.query(sqql,[req.body.email],(err,result)=>{
  if (err) return res.json({message:"Error in server"});
    //return res.json({Message : "Eroor in server"});

  if (result.length > 0) {
    // Check if the provided password matches the hashed password in the database
    const user = result[0];
    const isMatch =bcrypt.compare(req.body.password, user.password);
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {

    //  console.log(isMatch);
      if (err) {
        console.error("Error during password comparison:", err);
        return res.status(500).json({ message: "Password compare error" });
      }

      if (isMatch) {
        // Password is correct
        req.session.name = user.name;
        req.session.role= user.role;
        req.session.id23=user.id;
        console.log(user.id);
        console.log(req.session.id23);
const name=user.name;
//const role=user.role;
//const id=user.id;
const token=jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
res.cookie('token',token);
        return res.json({ message: "Success", Login: true, name: req.session.name ,role:req.session.role, id:req.session.id23});
      } else {
        // Password does not match
        return res.json({ message: "Invalid email or password", Login: false });
      }
    });
  } else {
    // Email not found
    return res.json({ message: "Invalid email or password", Login: false });
  }
 })
   })






   app.post('/updateprofile', (req, res) => {
    const { id, name, email } = req.body;
  
    // MySQL query to update user profile
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    
    db.query(sql, [name, email, id], (err, result) => {
      if (err) {
        console.error('Error updating profile:', err);
        return res.status(500).json({ message: 'Error updating profile' });
      }
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  });

  

  app.get("/gettingusers/:id", (req, res) => {
    const bookId = req.params.id;
    
    const q = "SELECT name,email,role,profile_image FROM users123 WHERE id = ?";
    const values = [bookId];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error fetching book:", err);
        res.status(500).json({ error: "Internal server error" });
      } else if (result.length === 0) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.status(200).json(result[0]);
      }
    });
  });

  app.put("/updatingusers/:id", upload6.single('profile_image'), (req, res) => {
    const bookId = req.params.id;
    const imageFile = req.file;
    // Log the length of the binary data

    try {
      if (!imageFile) {
        throw new Error("No file uploaded");
      }
 
      // Read the file content
      fs.readFile(imageFile.path, (err, data) => {
        if (err) {
          console.log(imageFile.length);
          console.error("Error reading file:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
  
        // Convert the file content to a Blob
        console.log('File path:', imageFile.path);
       // imageFile.path = imageFile.path.replace(/\//g, '\\');
        console.log('File path:', imageFile.path);

        const backendRoot = 'F:\\React_Internships\\fffffffunctinhall\\backend\\';
      //  F:\React_Internships\fffffffunctinhall\backend\public
        // Create the full path for LOAD_FILE
        const fullPath = path.join(backendRoot, imageFile.path.replace(/\//g, '\\'));
        console.log('File path:', fullPath);


      // const blob = Buffer.from(data);
        const blob = new Buffer.from(data, 'binary');
        console.log("Binary data size:", blob.length);

        const q = "UPDATE users123 SET `name`=?, `role`= ?, `profile_image`= LOAD_FILE(?) WHERE id = ?";
        const values = [
        
          req.body.name,
          req.body.role,
          fullPath,
          bookId
        ];
  
        db.query(q, values, (err, data) => {
          if (err) {
            console.error("Error updating book:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          res.json(data);
        });
      });
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });




  app.get("/displaybookingtou", (req, res) => {
    const getVenuesQuery = "SELECT venue_id,venue_name, location, venue_details, total_price, picture1 FROM venues"; // Adjusted query
    db.query(getVenuesQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json(result);
    });
});

app.get("/bookings", (req, res) => { 
  const getBookingsQuery = `
      SELECT venue_name, checkin_time, checkout_time, bstatus 
      FROM bookings where bstatus='booked';
  `;

  db.query(getBookingsQuery, (err, result) => {
      if (err) {
          console.error("SQL Error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }
      
      console.log("Fetched Bookings Data:", result);
      return res.status(200).json(result);
  });
});




app.get('/api/venues/:venue_id', (req, res) => {
  const venueId1 = parseInt(req.params.venue_id,10); // Convert string to number
  console.log("Fetching venue details for venue_id:", venueId1); // Log the venue_id
  // Extract venue_id from request parameters
const query = `
    SELECT venue_name, location, capacity, venue_details, 
           venue_price, gst, total_price, picture1, picture2 
    FROM venues 
    WHERE venue_id = ?`;
     // Querying the venues table
const venueId = [2]
db.query(query, venueId1, (error, results) => {
    if (error) {
        console.error('Database query error:', error);
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        return res.status(500).send('Internal Server Error');
       
    }
    if (results.length === 0) {
        return res.status(404).send('No venue found for this venue_id');
    }
    res.status(200).json(results[0]);  // Send the venue details as JSON
    console.log(results[0]);
});
});


// Assuming you have express and a MySQL connection already set up

app.get('/api/bookings/:venue_id', (req, res) => {
  const venueId1 = parseInt(req.params.venue_id,10); // Convert string to number
  console.log("Fetching venue details for venue_id:", venueId1); 
  
  const sql = `SELECT checkin_time, checkout_time ,venue_name
               FROM bookings 
               WHERE venue_id = ? 
                 AND bstatus = 'booked'`;

  db.query(sql, [venueId1], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});




app.get('/api/gotvenuesname/:venue_id', (req, res) => {
  const venueId1 = parseInt(req.params.venue_id,10); // Convert string to number
  console.log("Fetching venue details for venue_id:", venueId1);

  // Query to fetch the venue name based on venue_id
  db.query('SELECT venue_name FROM venues WHERE venue_id = ?', [venueId1], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
          // Send the venue name back as a response
          res.status(200).json({ venue_name: results[0].venue_name });
      } else {
          res.status(404).json({ message: 'Venue not found' });
      }
  });
});

app.post('/addingbookinggt', async(req, res) => {
  console.log('Received request to add a booking');

 // const { venue_id} = parseInt(req.params.venue_id,10);; // Destructure from req.params
 // const { getid: client_id } = parseInt(req.params.getid,10);
  //console.log('Extracted Parameters - Venue ID:', venue_id, 'Client ID:', client_id);

  const { num_children, num_adults, venue_name, checkin_time, checkout_time, venue_id, client_id } = req.body;
  console.log('Received Booking Data -', {
      num_children,
      num_adults,
      venue_name,
      checkin_time,
      checkout_time,
      venue_id,
      client_id
  });

  // Validate input
  if (!num_children || !num_adults || !venue_name || !checkin_time || !checkout_time) {
      console.log('Validation failed: All fields are required.');
      return res.status(400).json({ message: 'All fields are required.' });
  }

  // SQL query to insert a new booking
  const query = 'INSERT INTO bookings (client_id, num_children, num_adults, venue_id, venue_name, checkin_time, checkout_time) VALUES (?, ?, ?, ?, ?, ?, ?)';
  console.log('Executing SQL Query:', query);

  // Execute the query
  db.query(query, [client_id, num_children, num_adults, venue_id, venue_name, checkin_time, checkout_time], (err, result) => {
      if (err) {
          console.error('Error inserting booking:', err);
          return res.status(500).json({ message: 'Error adding booking' });
      }

      console.log('Booking added successfully:', result);
      res.status(201).json({ message: 'Booking added successfully', bookingId: result.insertId });
  });
});

// Route to fetch user bookings
app.get('/displayuserbookings/:getid', (req, res) => {
 // Convert string to number
 const getid = req.params.getid;  // Extract getid from params
  console.log("Fetching bookings for client_id:", getid);


  const query = `SELECT booking_id, checkin_time, checkout_time, num_adults, num_children, venue_name, venue_id 
  FROM bookings 
  WHERE client_id = ? 
  AND (bstatus = 'available' OR bstatus = 'pending')`; // Adjust table name and fields as needed
// Adjust table name and fields as needed
  db.query(query, getid,(err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    } else {
      res.json(results);
    }
  });
});

// Route to delete a specific booking by ID
app.delete('/deleteuserbookings/:booking_id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM bookings WHERE booking_id= ?'; // Adjust table and field names as needed
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ error: 'Failed to delete booking' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.json({ message: `Booking with ID ${id} deleted successfully` });
    }
  });
});



















app.put('/updateBooking/:booking_id/:getid', upload7.single('pdf_file_from_client'), (req, res) => {
  const { booking_id, getid } = req.params;
  const { catering, photography, supplier, decoration } = req.body;
  const pdfFile = req.file;  // This holds the file information if uploaded

  // Check if the file is uploaded
  if (!pdfFile) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  const backendRoot = 'F:\\React_Internships\\fffffffunctinhall\\backend\\';
  
  // Full path where the PDF file is stored (pdfFile.path is provided by multer)
  const fullPath = path.join(backendRoot, pdfFile.path.replace(/\//g, '\\'));
  console.log('File path:', fullPath);
  const fullPath1 = pdfFile.path;  // Use the path provided by multer
  console.log('File path:', fullPath1);
  const query = `UPDATE bookings 
                 SET bstatus= 'pending', catering = ?, photography = ?, supplier = ?, decoration = ?, pdf_file_from_client = ?
                 WHERE booking_id = ? AND client_id = ?`;

  const values = [catering, photography, supplier, decoration, fs.readFileSync(fullPath), booking_id, getid]; // Storing file data

  // Execute the query
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update booking' });
    }
    res.json({ message: 'Booking updated successfully' });
  });
});



app.get('/getBooking/:booking_id/:getid', (req, res) => {
  const { booking_id, getid } = req.params;

  const query = `SELECT catering, photography, supplier, decoration, pdf_file_from_client
                 FROM bookings WHERE booking_id = ? AND client_id = ?`;

  const values = [booking_id, getid];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Checking if PDF file is present in the results
    const booking = results[0];
    if (!booking.pdf_file_from_client) {
      booking.pdf_file_from_client = null; // Or handle with an empty value
    }

    res.json(booking); // Return the booking details
  });
});





app.get("/displaybookingtou1", (req, res) => {
  const getVenuesQuery = "SELECT venue_id,venue_name, location, venue_details, total_price, picture1 FROM venues"; // Adjusted query
  db.query(getVenuesQuery, (err, result) => {
      if (err) {
          return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json(result);
  });
});


app.get("/bookings1", (req, res) => { 
  const getBookingsQuery = `
      SELECT venue_name, checkin_time, checkout_time, bstatus 
      FROM bookings where bstatus='pending';
  `;

  db.query(getBookingsQuery, (err, result) => {
      if (err) {
          console.error("SQL Error:", err);
          return res.status(500).json({ message: "Internal server error" });
      }
      
      console.log("Fetched Bookings Data:", result);
      return res.status(200).json(result);
  });
});





































app.listen(8084, () => {
  console.log("Server is running on port 8084");
});
