const Sequelize = require("sequelize");

const sequelize = new Sequelize("coffeeDatabase", "postgres", process.env.PGPASS, {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate().then(
    function() {
        console.log("connected to the coffee database");
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;