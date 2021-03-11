import log4js from "log4js";

log4js.configure(
  {
    appenders: {
        fbiApi: { type: "file", filename: "./logs/fbiApiErrors.log" },
        writeData: { type: "file", filename: "./logs/writeDataErrors.log" },
        default: { type: "file", filename: "./logs/generalErrors.log" },
    },
    categories: {
        default:{ appenders: ["default"], level: "error" },
        fbiApi:{ appenders: ["fbiApi"], level: "error" },
        writeData:{ appenders: ["writeData"], level: "error" }
    }
  }
);

const fbiApilogger = log4js.getLogger("fbiApi");
const writeDataLogger = log4js.getLogger("writeData");
const defaultLogger = log4js.getLogger();

export default {
    fbiApilogger,
    writeDataLogger,
    defaultLogger,
};