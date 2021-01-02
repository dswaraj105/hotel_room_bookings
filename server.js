const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const roombookingroutes = require('./routes/roombooking');
const partyroutes = require('./routes/party');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);
app.use(roombookingroutes);
app.use(partyroutes);
app.use(adminRoutes);


// app.use('/', (req, res, next) => {
//   res.render('demo');
// });

app.listen(3000);