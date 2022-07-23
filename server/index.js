const express = require('express')
const cors = require('cors');
const app = express()
require('./models/db')()

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => res.send({msg:"ok"}))
app.use('/api',require('./routes/auth.route'))

const port = 8080
app.listen(port, () => console.log(`Server listening on port ${port}!`))