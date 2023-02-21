import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import {AlbumMutation} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  let artist_id = req.query.artist
  try {
    if (artist_id) {
      const albums = await Album.find({artist: artist_id});
      return res.send(albums);
    }

    const albums = await Album.find();
    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const albums = await Album.findById(req.params.id).populate('artist');
    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  const albumData: AlbumMutation = {
    artist: req.body.artist,
    name: req.body.name,
    image: req.file ? req.file.filename : null,
    year: req.body.year,
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default albumsRouter;