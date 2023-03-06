import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import route from './src/routers';
import passport from 'passport';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connectDB';
import configViewEngine from './src/config/viewengine';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 8888;

mongoose.set('strictQuery', true);

app.set('view engine', 'ejs');
app.set('views', './src/views');




// config templat engine
configViewEngine(app)
// config res.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(cookieParser(process.env.USER_CODE_SECRET));

route(app);


(async()=> {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is running: http://localhost:${PORT}/auth/login`);
    })
  } catch(error) {
    console.log(error);
  }
})()


//npm run start:dev