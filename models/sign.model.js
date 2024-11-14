import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Sign = sequelize.define('Sign', {
  keyword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export default Sign;