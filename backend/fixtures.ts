import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Task from "./models/Task";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('tasks');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [azamat, adilet] = await User.create({
      username: "Azamat",
      email: "azamat92@bk.ru",
      password: "12345",
      token: crypto.randomUUID()
    }, {
      username: "Adilet",
      email: "adilet94@mail.ru",
      password: "300",
      token: crypto.randomUUID()
    }
  );

  await Task.create(
    {
      user: azamat._id,
      title: "Do homework",
      description: "About homework",
      status: "new"
    },
    {
      user: azamat._id,
      title: "Go to swim",
      description: "About swim",
      status: "in_progress"
    },
    {
      user: azamat._id,
      title: "Repair the car",
      description: "About repair",
      status: "complete"
    },
    {
      user: adilet._id,
      title: "Build a house",
      description: "About house",
      status: "new"
    },
    {
      user: adilet._id,
      title: "Go on trip",
      description: "About trip",
      status: "in_progress"
    },
    {
      user: adilet._id,
      title: "Wash the dishes",
      description: "About dishes",
      status: "complete"
    },
  );

  await db.close();
};

void run();