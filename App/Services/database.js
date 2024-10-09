// database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('myDatabase');

export const createTable = async () => {
  await (await db).execAsync(
    `CREATE TABLE IF NOT EXISTS LietSi_ (
        LietSiId INTEGER PRIMARY KEY ,
        HoVaTen TEXT ,
        QueQuan TEXT ,
        NamSinh INTEGER ,
        NamMat INTEGER ,
        NoiYenNghi TEXT ,
        DonVi TEXT ,
        CapBac TEXT ,
        ViTriMoX REAL ,
        ViTriMoY REAL 
      );`
  );
};

export const insertSampleData = async () => {
  await (await db).execAsync(
    'INSERT INTO LietSi_ (HoVaTen, QueQuan, NamSinh, NamMat, NoiYenNghi, DonVi, CapBac, ViTriMoX, ViTriMoY) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      ['Nguyen Van A', 'Ha Noi', 1945, 1975, 'Nghia Trang A', 'Don Vi 1', 'Cap Bac 1', 21.0285, 105.8542]
  );
};

export const queryData = async (callback) => {
  await (await db).execAsync(
    'SELECT * FROM LietSi_', [], (_, { rows }) => {
      callback(rows);
  });
};
