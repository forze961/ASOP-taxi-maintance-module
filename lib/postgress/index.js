const Pool = require('pg-pool');

const config = {
  host: process.env.postgresHost || 'localhost',
  port: process.env.postgresPort || 5848,
  database: process.env.postgresDatabase || 'TEST-ASOP-STAT',
  user: process.env.postgresUser || 'postgres',
  password: process.env.postgresPassword || '159753',
};

const createTableStats = `
    CREATE TABLE IF NOT EXISTS tbl_asop_stats (
    id serial8,
    datetime timestamp DEFAULT current_timestamp UNIQUE,
    data jsonb,
    PRIMARY KEY (id)
);`;

const createTableStatsAkps = `
    CREATE TABLE IF NOT EXISTS tbl_asop_stats_akps (
    id serial8,
    datetime timestamp DEFAULT current_timestamp UNIQUE,
    data jsonb,
    PRIMARY KEY (id)
);`;

const createTableCarDict = `
    CREATE TABLE IF NOT EXISTS tbl_asop_cars_dictionary (
    id serial8,
    data jsonb,
    PRIMARY KEY (id)
);`;

const createIndex = 'CREATE INDEX IF NOT EXISTS asop_stats_data_index ON tbl_asop_stats USING gin (data);';
const createIndexAkps = 'CREATE INDEX IF NOT EXISTS asop_stats_data_akps_index ON tbl_asop_stats_akps USING gin (data);';
const createIndexCarsDict = 'CREATE INDEX IF NOT EXISTS asop_cars_data_index ON tbl_asop_cars_dictionary USING gin (data);';

const createAsopStatsTableAbility = async () => {
  try {
    const pool = new Pool(config);
    const client = await pool.connect();
    await client.query(createTableStats);
    await client.query(createTableStatsAkps);
    await client.query(createTableCarDict);
    await client.query(createIndex);
    await client.query(createIndexAkps);
    await client.query(createIndexCarsDict);
    client.release();
    await pool.end();
    return true;
  } catch (e) {
    return false;
  }
};

// Get by Unique key and top level json (fillies)
const getJsonDataByFilter = async (filter) => {
  try {
    const pool = new Pool(config);
    // Get by all filies or by filial number
    const queryString = filter.length === 3 ? 'SELECT data->$1 AS data, datetime FROM public.tbl_asop_stats WHERE datetime BETWEEN $2 AND $3 ORDER BY datetime DESC LIMIT 1;' : 'SELECT data, datetime FROM public.tbl_asop_stats WHERE datetime BETWEEN $1 AND $2 ORDER BY datetime DESC LIMIT 1';
    const client = await pool.connect();
    const prepareData = await client.query(queryString, [...filter]);
    const data = prepareData.rows[0];
    client.release();
    await pool.end();
    return data;
  } catch (e) {
    return [];
  }
};

// get last stats row for alarm backend
const getJsonDataLastForAlarms = async () => {
  try {
    const pool = new Pool(config);
    // Get by all filies or by filial number
    const queryString = 'SELECT data, datetime FROM public.tbl_asop_stats ORDER BY datetime DESC LIMIT 1';
    const client = await pool.connect();
    const prepareData = await client.query(queryString);
    const data = prepareData.rows[0];
    client.release();
    await pool.end();
    return data;
  } catch (e) {
    return [];
  }
};

// Get data by var and filia between date period
const getSpecificCarByFilial = async (filter) => {
  try {
    const pool = new Pool(config);
    // Get by all filies or by filial number
    const queryString = 'SELECT elem2, datetime, elem FROM tbl_asop_stats CROSS JOIN jsonb_object_keys(data) AS elem CROSS JOIN jsonb_array_elements(data->elem) AS elem2 WHERE elem2->>\'PENumPe\' = $1 AND datetime BETWEEN $2 AND $3 ORDER BY datetime DESC;';
    const client = await pool.connect();
    const prepareData = await client.query(queryString, [...filter]);
    const data = prepareData.rows;
    client.release();
    await pool.end();
    return data;
  } catch (e) {
    return [];
  }
};

const getSpecificAkp = async (filter) => {
  try {
    const pool = new Pool(config);
    // Get by all filies or by filial number
    const queryString = 'SELECT datetime, elem FROM tbl_asop_stats_akps CROSS JOIN jsonb_array_elements(data) AS elem WHERE elem->>\'location_id\' = $1 AND datetime BETWEEN $2 AND $3 ORDER BY datetime DESC;';
    const client = await pool.connect();
    const prepareData = await client.query(queryString, [...filter]);
    const data = prepareData.rows;
    client.release();
    await pool.end();
    return data;
  } catch (e) {
    return [];
  }
};

// Save json data
const saveJsonData = async (data) => {
  const prepareData = JSON.stringify(data);
  try {
    const pool = new Pool(config);
    const client = await pool.connect();
    await client.query('INSERT INTO public.tbl_asop_stats(datetime,data) VALUES($1,$2::jsonb) RETURNING *', [new Date(), prepareData]);
    client.release();
    await pool.end();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Save AKP current states for history (archive)
const saveJsonDataAkps = async (data) => {
  const prepareData = JSON.stringify(data);
  try {
    const pool = new Pool(config);
    const client = await pool.connect();
    await client.query('INSERT INTO public.tbl_asop_stats_akps(datetime,data) VALUES($1,$2::jsonb) RETURNING *', [new Date(), prepareData]);
    client.release();
    await pool.end();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Save car dictionary
const saveCarsDict = async (data) => {
  const prepareData = JSON.stringify(data);
  try {
    const pool = new Pool(config);
    const client = await pool.connect();
    await client.query('INSERT INTO public.tbl_asop_cars_dictionary(data) VALUES($1::jsonb) RETURNING *', [prepareData]);
    client.release();
    await pool.end();
    return true;
  } catch (e) {
    return false;
  }
};

// Get car from dictionary
const getCarsDict = async (filter) => {
  try {
    const pool = new Pool(config);
    // Get by all filies or by filial number
    const queryString = 'SELECT json_build_object(\'carName\', (elem->\'Name\')::json, \'carMode\',(elem->\'TrafficMode\')::json , \'carNum\',(elem->\'NumPe\')::json) AS result FROM tbl_asop_cars_dictionary CROSS JOIN jsonb_array_elements(data) AS elem WHERE (elem->\'NumPe\')::text LIKE $1 LIMIT 10';
    const client = await pool.connect();
    const prepareData = await client.query(queryString, [`%${filter}%`]);
    const data = prepareData.rows;
    client.release();
    await pool.end();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

module.exports = {
  saveJsonData,
  getJsonDataByFilter,
  createAsopStatsTableAbility,
  getSpecificCarByFilial,
  saveCarsDict,
  getCarsDict,
  getJsonDataLastForAlarms,
  saveJsonDataAkps,
  getSpecificAkp,
};
