const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_gneral_ci',
  });
  Comment.associate = (db) => {};
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);

  return Comment;
};
