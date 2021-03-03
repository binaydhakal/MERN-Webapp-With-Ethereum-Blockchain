const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://blockchain-bank:blockchain123@bank-cluster.rfqpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Database connection success");
    }


     catch (error) {
        console.log("Database connection error", error);
    }
}

module.exports = connectDB;