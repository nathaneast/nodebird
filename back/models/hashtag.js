const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_gneral_ci',
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post);
  };

  return Hashtag;
};
