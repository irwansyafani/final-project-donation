'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class DonorBeneficiary extends Model { }

  DonorBeneficiary.init({
    DonorId: DataTypes.INTEGER,
    BeneficiaryId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'DonorBeneficiary'
  })

  DonorBeneficiary.associate = function(models) {
    DonorBeneficiary.belongsTo(models.Donor)
    DonorBeneficiary.belongsTo(models.Beneficiary)
  };
  return DonorBeneficiary;
};