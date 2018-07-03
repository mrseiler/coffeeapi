module.exports = function(sequelize, DataType) {
    return sequelize.define("vendor", {

        name: {
            type: DataType.STRING,
            allowNull: false
        },
        coffee: {
            type: DataType.STRING
        },
        price: {
            type: DataType.INTEGER,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        vendorCreator: {
            type: DataType.STRING
        }
    })
}