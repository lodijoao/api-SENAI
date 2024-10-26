import postgres from 'postgres';

const env = {
PGHOST:'localhost',
PGDATABASE:'users',
PGUSER: 'local',
PGPASSWORD:'12345'
}

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: false,
});

export { sql };