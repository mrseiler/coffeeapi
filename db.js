const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DBNAME, process.env.PGUSER, process.env.PGPASSS, {
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