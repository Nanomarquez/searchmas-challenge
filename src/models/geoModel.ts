import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Address } from './addressModel';

interface GeoAttributes {
  id: number;
  lat: string;
  lng: string;
  addressId: number;
}

interface GeoCreationAttributes extends Optional<GeoAttributes, 'id'> {}

class Geo extends Model<GeoAttributes, GeoCreationAttributes> implements GeoAttributes {
  public id!: number;
  public lat!: string;
  public lng!: string;
  public addressId!: number;

  public static initModel(sequelize: Sequelize) {
    Geo.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        lat: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lng: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        addressId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Geo',
      }
    );
  }

  public static associate() {
    Geo.belongsTo(Address, { foreignKey: 'addressId' });
  }
}

export { Geo };
