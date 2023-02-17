import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('trackhistories');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [eminem, madonna] = await Artist.create({
    name: "Eminem",
    image: "fixtures/eminem.jpg",
    info: "Rap singer"
  }, {
    name: "Madonna",
    image: "fixtures/madonna.jpg",
    info: "Pop singer"
  });

  const [theEminemShow, americanLife] = await Album.create({
    name: "The Eminem Show",
    year: "2002",
    artist: eminem._id,
    image: "fixtures/the_eminem_show.jpg"
  }, {
    name: "American Life",
    year: "2003",
    artist: madonna._id,
    image: "fixtures/american_life.jpg"
  });

  await Track.create({
    name: "White America",
    time: "3:15",
    album: theEminemShow._id,
  }, {
    name: "Frozen",
    time: "3:15",
    album: americanLife._id,
  });

  await User.create({
    username: "Azamat",
    email: "azamat92@bk.ru",
    password: "12345",
    token: crypto.randomUUID()
  });

  await db.close();
};

void run();