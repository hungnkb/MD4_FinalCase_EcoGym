import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import route from './src/routers';
import passport from 'passport';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/dbtest')
  .then(() => console.log('DB Connected!'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
dotenv.config();
app.use(cookieParser(process.env.USER_CODE_SECRET));

route(app);


app.listen(PORT, () => {
  console.log('Server is running at ' + PORT);
  
})