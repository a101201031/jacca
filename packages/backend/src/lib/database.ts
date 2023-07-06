import type { Mongoose } from 'mongoose';
import mongoose from 'mongoose';

class DatabaseConnector {
  public database: Mongoose | null;

  #isConnected: boolean;

  constructor() {
    this.#isConnected = false;
    this.database = null;

    if (!this.database && mongoose.connection.readyState !== 1) {
      mongoose
        .connect(process.env.MONGO_DB_URL, {
          serverSelectionTimeoutMS: 5000,
        })
        .then(() => {
          this.database = mongoose;
          this.#isConnected = true;
        })
        .catch((err) => {
          throw err;
        });
    } else {
      this.database = mongoose;
      this.#isConnected = true;
    }
  }

  isConnected() {
    return new Promise<boolean>((resolve, reject) => {
      if (this.#isConnected) {
        resolve(true);
      }

      let isCanceled = false;
      const timeout = setTimeout(() => {
        isCanceled = true;
        reject(new Error('Connection timed out'));
      }, 5_000);

      mongoose.connection.once('connected', () => {
        if (isCanceled) return;
        clearTimeout(timeout);
        resolve(true);
      });
    });
  }

  async dispose() {
    await this.database.connection.close();
  }
}

export const databaseConnector = new DatabaseConnector();
