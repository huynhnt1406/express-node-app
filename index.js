const express = require('express')
const path = require('path')
const members = require('./Members')
const exphbs = require('express-handlebars')
const app = express()
//middleware
const logger = require('./middleware/logger')
app.use(logger)
//express-handlebars
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars')
//body parse
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//static folder
app.use(express.static(path.join(__dirname,'public')))
//rendering templates
app.get('/',(req,res) => {
    res.render('index' ,{
        titleWeb:'Employee Management',
        members
    })
})
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`))