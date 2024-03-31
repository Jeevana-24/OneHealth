const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Jeevana-24:Jeevu%40242@cluster0.nuhvlaf.mongodb.net/Healthwrap", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to MongoDB Atlas');
});

// Define a schema
const courseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

// Create a model
const Course = mongoose.model('Course', courseSchema);

// Routes
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/courses', async (req, res) => {
    const course = new Course({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    });
  
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
