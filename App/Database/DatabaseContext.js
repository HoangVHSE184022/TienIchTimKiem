import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDatabase = () => {
      const database = SQLite.openDatabase('LietSiDatabase.db');

      if (!database) {
        setError('Failed to open the database');
        return;
      }

      console.log('Database opened successfully');
      createTables(database);
      setDb(database);
      setIsInitialized(true);
    };

    initDatabase();
  }, []);

  const createTables = (database) => {
    const lietSiTableQuery = `
      CREATE TABLE IF NOT EXISTS LietSi (
        LietSiId INTEGER PRIMARY KEY,
        HoVaTen TEXT NOT NULL,
        QueQuan TEXT NOT NULL,
        NamSinh INTEGER NOT NULL,
        NamMat INTEGER NOT NULL,
        NoiYenNghi TEXT NOT NULL,
        DonVi TEXT NOT NULL,
        CapBac TEXT NOT NULL,
        ViTriMoX REAL NOT NULL,
        ViTriMoY REAL NOT NULL
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
  return context;
};
