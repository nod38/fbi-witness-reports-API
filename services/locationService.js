import geoip from 'geoip-lite';
import {countriesList} from './countriesList.js';
import logger from '../logger.js';

export function getLocation(ip) {
    try{
        const locationData = geoip.lookup(ip);
        if(!locationData) {
            throw Error('Bad IP address');
        }
        const countryCode = locationData.country;
        return countriesList.find(country => country.code === countryCode).name;
    } catch (error) {
        logger.defaultLogger.error(error);
        return null;
    }
}