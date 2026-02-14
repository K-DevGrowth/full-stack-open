const Sequelize = require("sequelize");

const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect to database");
    return process.exit(1);
  }
};

module.exports = { connectToDatabase, sequelize };
