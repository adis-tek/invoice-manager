import dotenv from "dotenv";
import * as pg from 'pg';

const { Pool } = pg.default;

dotenv.config();

const pool = new Pool({
    user: `${process.env.POOLUSER}`,
    password: `${process.env.POOLPASSWORD}`,
    port: process.env.POOLPORT,
    database: `${process.env.POOLDATABASE}`
});

export default pool