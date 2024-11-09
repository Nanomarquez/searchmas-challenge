import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Geo } from './geoModel';
import { User } from './userModel';

interface AddressAttributes {
  id: number;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  userId: number;
  geo?: Geo;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, 'id'> {}

class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id!: number;
  public street!: string;
  public suite!: string;
  public city!: string;
  public zipcode!: string;
  public userId!: number;
  public geo?: Geo;

  public static initModel(sequelize: Sequelize) {
    Address.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        suite: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        zipcode: {
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
        modelName: 'Address',
      }
    );
  }

  public static associate() {
    Address.belongsTo(User, { foreignKey: 'userId' });
    Address.hasOne(Geo, { foreignKey: 'addressId' });
  }
}

export { Address };
