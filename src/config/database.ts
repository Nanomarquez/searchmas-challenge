import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";
import { Geo } from '../models/geoModel';
import { User } from '../models/userModel';
import { Address } from '../models/addressModel';
import { Company } from '../models/companyModel';
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres',
  logging: false
});

// Initialize the models
User.initModel(sequelize);
Address.initModel(sequelize);
Geo.initModel(sequelize);
Company.initModel(sequelize);

// Define associations
User.associate();
Address.associate();
Geo.associate();
Company.associate();


export default sequelize;
