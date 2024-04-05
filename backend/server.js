const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

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

// Define schemas
const courseSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const nutritionSchema = new mongoose.Schema({
  userId: String,
  date: String,
  items: [{
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    quantity: Number
  }]
});

// Create models
const Course = mongoose.model('Course', courseSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);

// Course routes
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

// Nutrition routes
app.get('/nutrition/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const nutritionEntry = await Nutrition.findOne({ userId });
      if (nutritionEntry) {
          res.json(nutritionEntry);
      } else {
          res.status(404).json({ message: 'Nutrition data not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


app.post('/nutrition', async (req, res) => {
  const { userId, date, items } = req.body;

  const nutritionEntry = await Nutrition.findOne({ userId, date });

  if (nutritionEntry) {
      nutritionEntry.items.push(...items);
      await nutritionEntry.save();
  } else {
      const newEntry = new Nutrition({ userId, date, items });
      await newEntry.save();
  }

  res.status(200).json({ message: 'Nutrition data saved successfully' });
});
app.put('/nutrition/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;
  const updatedItem = req.body;

  try {
      const nutritionEntry = await Nutrition.findOne({ userId });
      if (nutritionEntry) {
          const itemIndex = nutritionEntry.items.findIndex(item => item._id.toString() === itemId);
          if (itemIndex !== -1) {
              nutritionEntry.items[itemIndex] = updatedItem;
              await nutritionEntry.save();
              res.status(200).json({ message: 'Item updated successfully' });
          } else {
              res.status(404).json({ message: 'Item not found' });
          }
      } else {
          res.status(404).json({ message: 'Nutrition entry not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
app.put('/nutrition/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;
  const updatedItem = req.body;

  try {
      const nutritionEntry = await Nutrition.findOne({ userId });
      if (nutritionEntry) {
          const itemIndex = nutritionEntry.items.findIndex(item => item._id.toString() === itemId);
          if (itemIndex !== -1) {
              nutritionEntry.items[itemIndex] = updatedItem;
              await nutritionEntry.save();
              res.status(200).json({ message: 'Item updated successfully' });
          } else {
              res.status(404).json({ message: 'Item not found' });
          }
      } else {
          res.status(404).json({ message: 'Nutrition entry not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



app.delete('/nutrition/:userId/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
      const nutritionEntry = await Nutrition.findOne({ userId });
      if (nutritionEntry) {
          nutritionEntry.items = nutritionEntry.items.filter(item => item._id.toString() !== itemId);
          await nutritionEntry.save();
          res.status(200).json({ message: 'Item deleted successfully' });
      } else {
          res.status(404).json({ message: 'Nutrition entry not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



app.delete('/nutrition/:userId/:date', async (req, res) => {
  const { userId, date } = req.params;
  try {
      await Nutrition.deleteOne({ userId, date });
      res.status(200).json({ message: 'All items cleared successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
