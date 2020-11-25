const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
dotenv.config();
const app = express();

db.sequelize.sync()
.then(() => {
  console.log('db 연결 성공!');
})
.catch(console.error);
passportConfig();

/////////////////////////////////////////////////
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);

const options = {
  host: config.host,
  port: 80,
  user: config.username,
  password: config.password,
  database: config.database,
};

const connection = mysql.createConnection(options); // or mysql.createPool(options);
const sessionStore = new MySQLStore({options}/* session store options */, connection);

/////////////////////////////////////////////////

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(cors({
    origin: 'http://nodebird.shop',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(session({
//   saveUninitialized: false,
//   resave: false,
//   secret: process.env.COOKIE_SECRET,
  // cookie: {
  //   httpOnly: true,
  //   secure: false,
  //   domain: process.env.NODE_ENV === 'production' && '.nodebird.shop'
  // },
// }));

app.use(session({
  key: 'MySQLStore_nodebird',
  secret: process.env.COOKIE_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    domain: process.env.NODE_ENV === 'production' && '.nodebird.shop'
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(80, () => {
  console.log('서버 실행중 !');
});
