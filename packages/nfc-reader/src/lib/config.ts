import low from 'lowdb';
import { default as FileSync } from 'lowdb/adapters/FileSync';
import path from 'path';

type DBSchema = {
  nfcReaderId: string;
};

const dbFilePath = path.join('db.json');

const adapter = new FileSync<DBSchema>(dbFilePath);

const db = low(adapter);

export default db;
