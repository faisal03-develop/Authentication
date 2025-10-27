require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const permit = require('./middleware/roles');

const app = express();

// connect to DB
connectDB();

// --- Fix starts here ---

app.use(helmet());

// Configure CORS to allow credentials from your client
const corsOptions = {
  origin: 'http://localhost:5173', // Your React client's URL
  credentials: true, // Allow cookies/auth headers
  optionsSuccessStatus: 200 // For older browser compatibility
};
app.use(cors(corsOptions));

app.use(express.json());

// --- Fix ends here ---

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);

// sample protected route
app.get('/protected', auth, permit('Admin'), (req, res) => {
  res.json({ message: 'Hello Admin', user: req.user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));