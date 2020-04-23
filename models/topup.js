'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Topup extends Model { }

  Topup.init({
    nominal: DataTypes.INTEGER,
    DonorId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'Topup'
  })
  
  Topup.associate = function(models) {
    // associations can be defined here
  };
  return Topup;
};