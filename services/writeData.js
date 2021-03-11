import { createWriteStream } from 'fs';
const writeStream = createWriteStream('./reports.csv');

export function writeData(data, cb) {
    writeStream.write(`${data.title},${data.phone},${data.country}\n`, cb);
}