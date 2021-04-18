const mongoose = require('mongoose');
const db_name = "pizzatime";
// const db_name = process.env.DB_NAME;

mongoose.connect("mongodb://localhost/" + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("successfully connected to the " + db_name + " database"))
    .catch((err) => {
        console.log("Something went wrong while connecting with the database " + db_name + ": ")
        console.log(err);   // <-- make sure the object is printed instead of the words [Object: Object]
    });
