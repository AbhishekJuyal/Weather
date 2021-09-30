const hbs = require('hbs')
const express = require('express')
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

//Defining paths for express configs
const static_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')//setting templates dir path
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('views', viewsPath)//setting view path so that express can serach in this directory for views
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)//partials directory registered, 

//Setting static content path
app.use(express.static(static_path));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Juyal'
    })
})

app.get('/help', (req, res) => {
    //res.send("Help Page") can also send JSOn objects and HTML codes for eg - res.send("<h1> Welcome   <h1/>")
    res.render('help', {
        helpText: 'This is help page',
        title: "Help",
        name: "Abhishek Juyal"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "Please provide address"});
    }
    geocode(req.query.address, (error, { lattitude, longitude, placename } = {}) => {
        if (error) {
            return res.send({ error })
        }
        else {
            forecast(lattitude, longitude, (error,forecastData) => {
                if (error) {
                    return res.send(error);
                }
                else {
                    res.send({ forecastData: forecastData, placeName: placename });
                }
                    
            })
        } 
        console.log(lattitude, longitude, placename);
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhishek Juyal'
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send("NO search query")
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {// always should be at the last as * is telling everthing should enter trhis callback
    res.render("404", {
        title: "404",
        description: "Help Article not found",
        name: "Abhishek Juyal"
    });
})

app.get('*', (req, res) => {// always should be at the last as * is telling everthing should enter trhis callback
    res.render("404", {
        title: "404",
        description: "Page not found",
        name:"Abhishek Juyal"
    });
})




app.listen(port, () => {
    console.log('listening on  ' + port);
});

