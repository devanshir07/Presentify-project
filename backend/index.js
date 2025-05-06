require('dotenv').config();
const express = require('express');
const path = require('path');
const UserRouter = require('./routers/userRouter');
const PPTRouter = require('./routers/pptRouter');
const FeedbackRouter = require('./routers/feedbackRouter');
const ContactRouter = require ('./routers/contactRouter')
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Serve files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/user', UserRouter);
app.use('/api/ppt', PPTRouter);
app.use('/feedback', FeedbackRouter);
app.use('/contact', ContactRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

