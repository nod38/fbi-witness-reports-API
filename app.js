import dotenv from 'dotenv';
import express from 'express';
import reportController from './controllers/reportController.js';

const app = express();
app.use(express.json());

dotenv.config();

app.post(
    '/report',
    reportController.validate('addReport'),
    reportController.addReport
);

const serverPort = process.env.API_PORT || 4000;
app.listen(serverPort, () => {
    console.log(`Node fbi-witness-reports-api running on port: ${serverPort}`);
});