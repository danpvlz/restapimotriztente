require('dotenv').config();
const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
//app.use(cors());
app.use(express.json());

// Routes
app.use('/api/fallas-vehiculares', require('./routes/fallaVehicular'));
app.use('/api/diagnostico', require('./routes/diagnostico'));
app.use('/api/auxilio', require('./routes/auxilio'));
//app.use(require('./routes/employees'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${process.env.PORT}`);
});
