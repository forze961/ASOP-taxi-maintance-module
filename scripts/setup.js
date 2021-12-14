const winston = require('winston');
const { createAsopStatsTableAbility } = require('../lib/postgress/index.js');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console()],
});

async function setupPostgress() {
  try {
    logger.info('Start creating postgres ability...');
    const result = await createAsopStatsTableAbility();
    if (!result) logger.error('Not created postgress ability');
    else logger.info('Created postgress ability - OK!');
  } catch (e) {
    logger.error(e);
  }
}

setupPostgress();
