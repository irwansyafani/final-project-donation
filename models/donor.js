'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Donor extends Model { }

  Donor.init({
    donor_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        check(value) {
          if (value == 'admin@gmail.com') {
            throw new Error (`<h1>You can't register as admin</h1>`)
          } else if(value == '') {
            throw new Error (`Email can't empty`)
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        check(value) {
          if (value == '') {
            throw new Error (`Password can't empty`)
          }
        }
      }
    },
    credit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    hooks: {
      beforeCreate(donor) {
        if (donor.donor_name == '') {
          donor.donor_name = 'Anonymous Person'
        }
      }
    },
    sequelize,
    modelName: 'Donor'
  })

  Donor.associate = function(models) {
    Donor.belongsToMany(models.Beneficiary, { through: 'DonorBeneficiaries' })
  };
  return Donor;
};