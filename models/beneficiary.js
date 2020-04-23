'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Beneficiary extends Model {
    realtime_credit() {
      return `${this.credit} / ${this.target}`
    }
    get_button(){
      if (this.credit >= this.target) {
        return true
      } else {
        return false
      }
    }
  }

  Beneficiary.init({
    institution: DataTypes.STRING,
    target: DataTypes.INTEGER,
    head_of_institution: DataTypes.STRING,
    credit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, 
  {
    sequelize,
    modelName: 'Beneficiary'
  })

  Beneficiary.associate = function(models) {
    Beneficiary.belongsToMany(models.Donor, { through: 'DonorBeneficiaries' })
  };
  return Beneficiary;
};