require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const config = require('./config');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors(config.application.cors.server));
app.use(express.json());

// Routes
app.use('/api/fallas-vehiculares', require('./routes/fallaVehicular'));
app.use('/api/diagnostico', require('./routes/diagnostico'));
app.use('/api/auxilio', require('./routes/auxilio'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/solicitudes-auxilio', require('./routes/solicitudes'));
app.use('/api/usuario',require('./routes/users'));
app.use('/api/distrito',require('./routes/distritos'));
//app.use(require('./routes/employees'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${process.env.PORT}`);
});
