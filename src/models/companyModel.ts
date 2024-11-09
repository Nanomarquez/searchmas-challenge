import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { User } from './userModel';

interface CompanyAttributes {
  id: number;
  name: string;
  catchPhrase: string;
  bs: string;
  userId: number;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public id!: number;
  public name!: string;
  public catchPhrase!: string;
  public bs!: string;
  public userId!: number;

  public static initModel(sequelize: Sequelize) {
    Company.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        catchPhrase: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bs: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Company',
      }
    );
  }

  public static associate() {
    Company.belongsTo(User, { foreignKey: 'userId' });
  }
}

export { Company };
