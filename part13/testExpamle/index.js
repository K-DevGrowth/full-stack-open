require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  },
);

app.use(express.json());

app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();
  console.log(JSON.stringify(notes, null, 2));
  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON());
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    req.json(note);
  } else {
    res.status(404).end();
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const PORT = process.env.PORT || 3001;
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

start();
