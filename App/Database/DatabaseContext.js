import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('LietSiDatabase.db');
        if (!database) {
          setError('Failed to open the database');
          return;
        }

        await createTables(database);
        setDb(database);
        setIsInitialized(true);
        console.log('Database opened successfully');
      } catch (error) {
        setError(error.message);
        console.error('Error opening database:', error);
      }
    };

    initDatabase();
  }, []);

  const createTables = async (database) => {
    try {
      await database.execAsync(`
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
      `);
    } catch (error) {
      console.error('Error creating tables:', error);
      setError(error.message);
    }
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