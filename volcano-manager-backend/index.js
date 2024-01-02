const express = require('express');
const cors = require("cors")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const nodemailer = require('nodemailer');

const port = process.env.PORT || 5000
const app = express();

// Middleware
app.use(cors())
app.use(express.json())

// Simulated blacklist of invalidated tokens
const invalidatedTokens = new Set();

// Middleware to verify JWT
function verifyJWT(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ status: 401, message: 'Authorization token missing' });
    }

    if (invalidatedTokens.has(token)) {
        return res.status(401).json({ status: 401, message: 'Token has been invalidated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ status: 403, message: 'Invalid JWT token' });
    }
}

// Generate JWT token function
function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// mongodb connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Create a nodemailer transporter with your email service configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Replace with your email service (e.g., Gmail, Outlook, etc.)
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS
    }
});

async function run() {
    try {
        // await client.connect();
        const database = client.db('volcano');
        const usersCollection = database.collection('users');
        // Number of salt rounds for bcrypt hashing
        const saltRounds = 10;

        // create user
        app.post('/register', async (req, res) => {
            const { data } = req.body;
            const { email, password } = data;

            // Hash the password
            try {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                // Update the user object with the hashed password
                data.password = hashedPassword;
                // add createdAt time
                data.createdAt = new Date();

                // CHECK if the email is already exist or not
                const existingUser = await usersCollection.findOne({ email });

                if (existingUser) {
                    return res.json({
                        status: 400,
                        message: "This email is already registered"
                    });
                }

                // if the email is not already registered,
                const result = await usersCollection.insertOne(data);
                console.log(result)
                // Generate and send JWT token in the response
                const token = generateToken({ userId: result.insertedId });
                // get the user data
                res.json({
                    status: 200,
                    _id: result._id,
                    jwt: token
                });

            } catch (err) {
                res.json({
                    status: 500,
                    message: "Internal Server Error"
                });
            }
        });

        // login user
        app.post('/login', async (req, res) => {
            const { email, password } = req.body;
            const query = { email: email };
            try {
                const user = await usersCollection.findOne(query);

                if (!user) {
                    return res.json({
                        status: 404,
                        message: "User does not exist with this email"
                    });
                }

                // Compare the provided password with the hashed password
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.json({
                        status: 401,
                        message: "Incorrect password"
                    });
                }

                // Password is valid, generate and send JWT token in the response
                const token = generateToken({ userId: user._id });
                res.json({
                    status: 200,
                    _id: user._id,
                    jwt: token,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            } catch (err) {
                res.json({
                    status: 500,
                    message: "Internal Server Error"
                });
            }
        });
        // update password
        app.put('/reset-password', async (req, res) => {
            const { data } = req.body;
            const email = data.email;
            const query = { email: email };
            try {
                const getSingleUser = await usersCollection.findOne(query);
                if (!getSingleUser) {
                    return res.json({
                        status: 404,
                        message: "User not found"
                    })
                }
                const result = await usersCollection.updateOne(query, {
                    // schema validation 
                    $set: {
                        password: data.password,
                    }
                });
                res.json({
                    status: 200,
                    data: result
                })
            }
            catch (err) {
                res.json({
                    status: 500,
                    message: "Internal Server Error"
                })
            }
        })

        app.get('/logout', (req, res) => {
            const token = req.query.jwt;
            if (!token) {
                return res.status(400).json({ status: 400, message: 'JWT query parameter missing' });
            }

            invalidatedTokens.add(token);
            res.json({ message: 'Token invalidated' });
        });

        // get all users
        app.get('/all-users', verifyJWT, async (req, res) => {
            try {
                const result = await usersCollection.find({}).toArray();
                res.json({
                    status: 200,
                    data: result
                })
            } catch (err) {
                res.json({
                    status: 500,
                    message: "Internal Server Error"
                })
            }
        })

        console.log('Connected successfully to MongoDB server');
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
});