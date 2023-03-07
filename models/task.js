'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { 
        foreignKey:'user_id'
      })
      models.User.hasMany(Task, { 
        foreignKey:'user_id'
      });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    userId: { 
      type:DataTypes.INTEGER,
      field:'user_id'
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};