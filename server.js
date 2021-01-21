const app = require('./app')
const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect('mongodb://localhost:27017/tajikSocialNetwork', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log(chalk.yellow(`DB connection successful!!!`)))

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => console.log(chalk.yellow(`Your app is running on port: ${PORT} !!!`)))