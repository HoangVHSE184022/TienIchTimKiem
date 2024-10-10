import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDatabase = async () => {
      const database = SQLite.openDatabaseAsync('LietSiDatabase.db');
      if (!database) {
        setError('Failed to open the database');
        return;
      }

      console.log('Database opened successfully');
      await createTables(database);
      setDb(database);
      setIsInitialized(true);
    };

    initDatabase();
  }, []);

  const createTables = (database) => {
    const lietSiTableQuery = `
      CREATE TABLE IF NOT EXISTS LietSi (
        LietSiId INTEGER PRIMARY KEY AUTOINCREMENT,
        HoVaTen TEXT,
        QueQuan TEXT,
        NamSinh INTEGER,
        NamMat INTEGER,
        NoiYenNghi TEXT,
        DonVi TEXT,
        CapBac TEXT,
        ViTriMoX REAL,
        ViTriMoY REAL
      )
    `;

    database.transaction(tx => {
      tx.executeSql(
        lietSiTableQuery,
        [],
        () => console.log('LietSi table created successfully'),
        (tx, error) => {
          console.error('Error creating table:', error);
          setError(error.message);
        }
      );
    });
  };

  return (
    <DatabaseContext.Provider value={{ db, isInitialized, error }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
          <Button
            title="Create Database"
            
          />
  return context;
};
