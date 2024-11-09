"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExternalData = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchExternalData = async () => {
    try {
        const { data } = await axios_1.default.get(process.env.EXTERNAL_API_URL);
        return data;
    }
    catch (error) {
        console.error('Error fetching external data:', error);
        throw new Error('Error fetching external data');
    }
};
exports.fetchExternalData = fetchExternalData;
