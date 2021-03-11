import request from 'request-promise-native';
import logger from '../logger.js';

async function getFbiData(title) {
    try{
        const response = JSON.parse(await request({
            url: 'https://api.fbi.gov/wanted/v1/list',
            qs:{
                title,
            },
        }));

        if (!response || !response.items) return;

        if (response.items.length === 0) return {};

        return response.items[0];
    } catch (error) {
      logger.fbiApilogger.error(error.error);
    }
}

export default {
  getFbiData
}