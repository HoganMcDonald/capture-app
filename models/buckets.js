/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buckets', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bucket_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bucket_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'buckets'
  });
};
