import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/user.js';

// ES module path handling
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/read',  async(req, res) => {
      let allusers = await UserModel.find()
    res.render('read',{users:allusers});

});

// Create user route
app.post('/create', async (req, res) => {
  
    const { name, email, image } = req.body;

    const createdUser = await UserModel.create({ name, email, image });
    res.redirect("/read")
  
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});