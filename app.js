const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/user')

const http = require('http');

const app = express();
app.use(express.json());

app.use(cors());

const hotelRoutes = require('./routes/hotel')
const userRoutes = require('./routes/user')
const transRoutes = require('./routes/transaction')
const adminRoutes = require('./routes/admin')

app.use(hotelRoutes)
app.use(userRoutes)
app.use(transRoutes)
app.use('/admin', adminRoutes)

const server = http.createServer(app);

mongoose.connect('mongodb+srv://dinhngocnam:dinhngocnam1234@asssignment2.xvu0jkx.mongodb.net/assignment2?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'dinhngocnam',
                    password: '123456',
                    isAdmin: true
                })
                user.save()
            }
        })
        server.listen(5000)
    }
    )

    .catch(err => console.log(err))
