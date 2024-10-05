import express from 'express';
import logger from "./middleware/logger.js";
import posts from './routes/posts.js'
import errorHandler from './middleware/error.js';

const app = express();
const port = process.env.PORT;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Logger
app.use(logger)

app.get('/', (req, res, next) => {
  res.send('Hello World')
})

// Routes
app.use('/api/todo', posts)


// Error Handler 
app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port: ${port}`));