import { body, validationResult } from 'express-validator';
import {getLocation} from '../services/locationService.js';
import parsePhoneNumber from 'libphonenumber-js';
import fbiApiService from '../services/fbiApiService.js';
import {writeData} from '../services/writeData.js';
import logger from '../logger.js';

async function addReport(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    const providedTitle = req.body.title.trim();
    const fbiCase = await fbiApiService.getFbiData(providedTitle);
    if (!fbiCase) {
        return res.status(503).send({
            success: false,
            error: {
                message : 'Fbi Api Error',
            },
        });
    }

    if (!fbiCase.title || fbiCase.title.toLowerCase() !== providedTitle.toLowerCase()) {
        return res.status(400).send({
            success: false,
            error: {
                message : 'Case title doesn\'t exist',
            },
        });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const country = getLocation(ip);

    const data = {
        country,
        title: fbiCase.title,
        phone: req.body.phone.trim(),
    };

    writeData(data, (error) => {
        if (error) {
            logger.writeDataLogger.error(error);
        }
    });

    res.status(201).send({success: true});
}

function validate(method) {
    switch (method) {
        case 'addReport': {
            return [
               body('title', 'title must be provided').exists(),
               body('title', 'title must be a string').isString(),
               body('phone', 'phone must be provided').exists(),
               body('phone', 'phone must be a string').isString(),
               body('phone').custom(value => {
                    const phoneNumber = parsePhoneNumber(value);
                    if (!phoneNumber || !phoneNumber.isValid()) {
                        throw new Error('Invalid phone number. (Example: +381661234567)');
                    }
                return true;
                })
            ]
        }
    }
}

export default {
    addReport,
    validate,
}
