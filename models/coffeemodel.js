module.exports = function(sequelize, DataType) {
    return sequelize.define("coffee", {

        name: {
            type: DataType.STRING,
            allowNull: false
        },
        beanType: {
            type: DataType.STRING,
            allowNull: false
        },
        roast: {
            type: DataType.STRING,
            allowNull: false
        },
        amount: {
            type: DataType.INTEGER,
            allowNull: false
        },
        addedBy: {
            type: DataType.STRING
        }
    })
}