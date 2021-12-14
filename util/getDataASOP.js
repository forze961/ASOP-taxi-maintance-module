// eslint-disable-next-line import/extensions
const { saveJsonData, saveJsonDataAkps } = require('../lib/postgress/index.js');
const { fillies, serviceUrl, serviceCurrentStateAkps } = require('../lib/postgress/config');

const axios = require('axios').default;
const moment = require('moment');
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console()],
});

// eslint-disable-next-line no-use-before-define
getMainData();
// eslint-disable-next-line no-use-before-define
getAkpsData();

// Filter by only works now formulars
function filterByOnlyWorks(user = {
  factWorkHeaderisClosed: undefined, factWorkHeaderEnd: undefined, factWorkHeaderBegin: undefined,
}) {
  let tempEnd;
  const tempDate = new Date();
  let tempTime;

  if (tempDate.getHours() < 4) {
    tempTime = 60 * (24 + tempDate.getHours()) + tempDate.getMinutes();
  } else {
    tempTime = 60 * tempDate.getHours() + tempDate.getMinutes();
  }

  const dutyBeg = 60 * user.factWorkHeaderBegin.substr(11, 2) + Number(user.factWorkHeaderBegin.substr(14, 2));

  if (user.factWorkHeaderEnd.substr(9, 1) === '2') {
    tempEnd = Number(user.factWorkHeaderEnd.substr(11, 2)) + 24;
  } else {
    tempEnd = Number(user.factWorkHeaderEnd.substr(11, 2));
  }

  const dutyEnd = 60 * tempEnd + Number(user.factWorkHeaderEnd.substr(14, 2));

  return tempTime > dutyBeg - 1 && tempTime < dutyEnd + 1 && user.factWorkHeaderisClosed === 0;
}

async function getMainData() {
  try {
    const prepareFilialData = {};

    // Send multiple queries for date period
    const arrayWithResults = await Promise.all(
      fillies.map((current) => axios.post(serviceUrl, {
        tDate: moment().format('YYYY-MM-DD'),
        tData4: current,
      })),
    );

    arrayWithResults.map((x) => prepareFilialData[JSON.parse(x.config.data).tData4] = x.data
      .filter(filterByOnlyWorks)
      .map((z) => ({
        PENumPe: z.PENumPe, validation: z.validation, obtime: z.obtime, info: z.info, marNum: z.marNum, smenTripCount: z.smenTripCount, factWorkHeaderEnd: z.factWorkHeaderEnd,
      })));

    const saveStatus = await saveJsonData(prepareFilialData);

    if (saveStatus) logger.info(`(${moment().format('YYYY-MM-DD HH:mm:ss')}) PARSED data from monitoring — OK!`);
  } catch (e) {
    logger.error('PARSED data from monitoring — ERROR! See next str:');
    logger.error(e);
  }
}
async function getAkpsData() {
  try {
    // Send multiple queries for all akps (kpt, subway)
    const { data } = await axios.post(serviceCurrentStateAkps, {
      tData4: ['STMon', 'Mon'],
    });

    const saveStatus = await saveJsonDataAkps(data);

    if (saveStatus) logger.info(`(${moment().format('YYYY-MM-DD HH:mm:ss')}) PARSED data from monitoring (akps) — OK!`);
  } catch (e) {
    logger.error('PARSED data from monitoring (akps) — ERROR! See next str:');
    logger.error(e);
  }
}
