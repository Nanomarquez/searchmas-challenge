import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Address } from './addressModel';
import { Company } from './companyModel';

interface UserAttributes {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address?: Address;
  company?: Company;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public phone!: string;
  public website!: string;
  public address?: Address;
  public company?: Company;

  public static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        website: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }

  public static associate() {
    User.hasOne(Address, { foreignKey: 'userId' });
    User.hasOne(Company, { foreignKey: 'userId' });
  }
}

export { User };
