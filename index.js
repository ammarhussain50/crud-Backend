import express from 'express';
import mongoose from 'mongoose';
import UserModel from './models/user.js';

// ES module path handling
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';
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
    res.render('read',{user:allusers});

});
app.get('/delete/:id',  async(req, res) => {
      let users = await UserModel.findOneAndDelete({_id:req.params.id})
      res.redirect('/read')

});
app.get('/edit/:userid',  async(req, res) => {
      let user = await UserModel.findOne({_id:req.params.userid})
      res.render('edit',{user})

});
app.post('/update/:userid',  async(req, res) => {
  let{image , email , name} = req.body
      let user = await UserModel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true})
      res.redirect('/read')

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





