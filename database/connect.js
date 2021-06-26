const mongoose = require('mongoose');
require('dotenv').config();
function connect() {
    const connection = mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    connection.catch(err => {
        console.log('err ' + err);
    })
}
module.exports= {
    connect,
}