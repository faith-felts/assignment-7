const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const db = new Sequelize({ 
    dialect: 'sqlite', 
  storage: process.env.DB_NAME ? `database/${process.env.DB_NAME}` : 'database/music_library.db', 
    logging: console.log // Not necessary, but shows SQL queries in the console 
})

async function setupDatabase() { 
    try { 
        await db.authenticate(); 
        console.log('Connection to database established successfully.'); 

        await db.sync({ force: true })
        console.log('Database file created at:', `database/${process.env.DB_NAME}`); 

        await db.close(); 
    } catch (error) { 
         console.error('Unable to connect to the database:', error); 
    } 
}


// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}


// Define Track model
const Track = db.define('Track', {
trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false // required
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false // required
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false // required
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false // required
  },
  duration: {
    type: DataTypes.INTEGER, // in seconds
    allowNull: true
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
 
});

// Export the model and the connection to use in other files 
module.exports = { db, Track };
