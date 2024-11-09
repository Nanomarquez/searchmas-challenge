import { User } from '../models/userModel';
import { fetchExternalData } from '../services/externalAPI';
import { parse } from 'json2csv';
import { Address } from '../models/addressModel';
import { Geo } from '../models/geoModel';
import { Company } from '../models/companyModel';
import { Request, Response } from 'express';

//Handler to get all users with pagination
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      include: [
        { model: Address, include: [Geo] },
        Company
      ],
      limit,
      offset,
    });

    res.status(200).json({
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    });
  } 
  catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message || 'Unknown error occurred' 
    });
  }
};

// Handler to bring in external data and save it to the database
export const fetchDataAndSave = async (req: Request, res: Response) => {
  try {
    const data = await fetchExternalData(); 

    for (const userData of data) {
      const { address, company, ...userInfo } = userData;
      
      const user = await User.create(userInfo);

      if (address) {
        const { geo, ...addressData } = address;
        const addressInstance = await Address.create({
          ...addressData,
          userId: user.id,
        });

        if (geo) {
          await Geo.create({ ...geo, addressId: addressInstance.id });
        }
      }

      if (company) {
        await Company.create({ ...company, userId: user.id });
      }
    }

    res.status(200).json({ message: 'Data fetched and saved for all users' });
  } catch (error: any) {
    console.error('Error fetching and saving data:', error);
    res.status(500).json({
      message: 'Error fetching and saving data',
      error: error.message || 'Unknown error occurred'
    });
  }
};

// Handler to export data to CSV
export const exportToCSV = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Address, include: [Geo] },
        Company
      ],
    });

    // Cambiamos `map` por `for...of` para usar `await` sin problemas
    const data = [];
    for (const user of users) {
      const address = await Address.findOne({
        where: {
          userId: user.id,
        },
      });
      const company = await Company.findOne({
        where: {
          userId: user.id,
        },
      });

      data.push({
        ID: user.id,
        Name: user.name,
        Username: user.username,
        Email: user.email,
        Phone: user.phone,
        Website: user.website,
        Address: `${address?.street}, ${address?.suite}, ${address?.city}, ${address?.zipcode}`,
        Company: company?.name,
      });
    }

    const csv = parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.status(200).send(csv);
  } catch (error: any) {
    console.error('Error exporting data to CSV:', error);
    res.status(500).json({
      message: 'Error exporting data to CSV',
      error: error.message || 'Unknown error occurred' 
    });
  }
};