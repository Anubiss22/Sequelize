const { create } = require('domain');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ucheba', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATE
    },
    city: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'users'
});

const UserDan = sequelize.define('UserDan', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'usersdan'
});



;(async () => {
    try {
        await User.sync({
            alter: true,
            force: false
        });
        await UserDan.sync({
            alter: true,
            force: false
        });
      
//Список из таблицы
        const user = await User.findAll()
        console.log(user);

        получения элемента по идентификатору
        const user = await User.findByPk(2);
        if (user === null) {
            console.log('Not found!');
        } else {
            console.log(user);}

        получения списка элементов с условием
        const user = await User.findAll({
            where: {
                city: 'Рубцовск'
            }
        })
        console.log(user);

//Добавление
        const user = await User.create({ 
            name: "Jane", 
            birthday: "23.01.2001",
            city: "Славгород",
            created_at: "30.02.2013",
            updated_at: "224.10.2018" });
        console.log("DDDDDDD auto-generated ID:", user.id);
        const usersdan = await UserDan.create({ 
            first_name: "Jane", 
            last_name: "Doe",
            photo_id: "ppp",
            birthday: "13.06.1983",
            country: "Россия",
            city: "Астрахань",
            gender: "male",
            balance: "23440" });
        console.log("Jane's auto-generated ID:", usersdan.id);

//Редактирование
const user = await User.findOne({
    where: {
        city: 'Славгород'
    }
})
user.name = 'Алексей';
user.save();
console.log(user);

//Удаление
        const user = await User.destroy({
        where: {
        city: 'Славгород'
        }
        })

//связь между моделями
User.hasOne(UserDan);
UserDan.belongsTo(User);


const user = User.hasOne()

    } catch (error) {
        console.error(error);
    }
})();

