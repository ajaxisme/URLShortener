const express = require('express');
const cors = require('cors');

const routes = require('./routes/routes')

const app = express();

app.use(cors());
app.use(routes);

const PORT = 3000;
app.listen(PORT, function () {
  console.log("URL shortener running at port " + PORT);
});
