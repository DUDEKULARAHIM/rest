// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware for parsing JSON bodies
// app.use(bodyParser.json());

// // Connect to MongoDB (replace 'your_mongo_uri' with your actual MongoDB URI)
// mongoose.connect('mongodb+srv://rahim:Rahim@78@cluster0.exongyv.mongodb.net/?retryWrites=true', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // Define a schema and model for reservations
// const reservationSchema = new mongoose.Schema({
//     name: String,
//     phone: String,
//     guests: Number,
//     time: String
// });

// const Reservation = mongoose.model('Reservation', reservationSchema);

// // Route for handling the reservation form submission
// app.post('/reservation', async (req, res) => {
//     try {
//         // Create a new reservation using the data from the request body
//         const { name, phone, guests, time } = req.body;
//         const newReservation = new Reservation({ name, phone, guests, time });
        
//         // Save the reservation to the database
//         await newReservation.save();
        
//         // Send a success response
//         res.json({
//             status: 'success',
//             message: 'Reservation received successfully',
//             data: newReservation
//         });
//     } catch (error) {
//         // Handle any errors that occur
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB (replace 'your_mongo_uri' with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Define a schema and model for reservations
const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    time: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Route for handling the reservation form submission
app.post('/reservation', async (req, res) => {
    try {
        // Create a new reservation using the data from the request body
        const { name, phone, guests, time } = req.body;
        const newReservation = new Reservation({ name, phone, guests, time });

        // Save the reservation to the database
        await newReservation.save();

        // Send a success response
        res.json({
            status: 'success',
            message: 'Reservation received successfully',
            data: newReservation
        });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
