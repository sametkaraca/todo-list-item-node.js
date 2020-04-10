const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const app = express()

let items = []
let workItems = []
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {

    const today = new Date()
    
    const options = {
        weekday: "long",
        day: 'numeric',
        month: 'long'
    }

    const day = today.toLocaleDateString('en-US', options)

    res.render('list', {
        listTitle: day, 
        newlistItems: items
    })

})

app.post('/', (req,res)=>{

    let item = req.body.newItem

    if(req.body.list === "Work") {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }
})

app.get('/work',(req,res)=>{
    res.render('list', {listTitle: "Work List", newlistItems: workItems})
})

app.post('/work',(req,res)=>{
    let item = req.body.newItem
    workItems.push(item)
    res.redirect('/work')
})

app.listen(port, () => {
    console.log('Listening port ' + port);
})