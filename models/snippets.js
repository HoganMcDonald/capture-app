/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('snippets', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    snippet_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    img_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tone_info: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bucket_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'buckets',
        key: 'id'
      }
    }
  }, {
    tableName: 'snippets'
  });
};
