module.exports = function(sequelize, DataType) {
    return sequelize.define("user", {

        firstName: {
            type: DataType.STRING,
            allowNull: false,
            is: ["^[a-z]+$",'i'],
            len: [2,30]
        },
        lastName: {
            type: DataType.STRING,
            allowNull: false,
            is: ["^[a-z]+$",'i'],
            len: [2,30]
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            len: [5,20]
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            isAlphanumeric: true,
            len: [6,30]   
        }
    })
}