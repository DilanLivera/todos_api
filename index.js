const express = require("express"),
      bodyParser = require("body-parser"),
      app     = express(),
      port    = process.env.PORT || 3000,
      toDoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //above line and this line helps us to access data sent in a post or put request
app.use('/api/todos', toDoRoutes);
// app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views')); //__dirname is current directory name
    
app.get('/', (req, res) => res.sendFile("index.html"));
    
app.listen(port, () => console.log(`Server is runnin on port ${port}`));