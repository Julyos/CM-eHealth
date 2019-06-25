const mongoose = require('mongoose');

/*mongoose.connect('mongodb://localhost/blood_pressure_rt',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})*/

mongoose.connect('mongodb://admin:admin123@blood-pressure-rt-shard-00-00-1wrib.mongodb.net:27017,blood-pressure-rt-shard-00-01-1wrib.mongodb.net:27017,blood-pressure-rt-shard-00-02-1wrib.mongodb.net:27017/blood-pressure-rt?ssl=true&replicaSet=blood-pressure-rt-shard-0&authSource=admin&retryWrites=true',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db =>console.log('DB is connected'))
    .catch(err => console.error(err));