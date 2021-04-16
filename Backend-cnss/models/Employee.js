module.exports = (sequelize, DataTypes) => {

    const Employee = sequelize.define('Employee',{
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        cin: DataTypes.STRING,
        dateNaissance: DataTypes.DATE,
        phone: DataTypes.STRING,
    })

    return Employee
}