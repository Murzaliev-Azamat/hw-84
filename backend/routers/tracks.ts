import express from "express";
import mongoose from "mongoose";
import {TrackMutation} from "../types";
import Track from "../models/Track";

const tracksRouter = express.Router();

tracksRouter.get('', async (req, res, next) => {
  let album_id = req.query.album

  if (album_id) {
    const tracks = await Track.find({album: album_id});
    return res.send(tracks);
  }

  try {
    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});


tracksRouter.post('', async (req, res, next) => {
  const trackData: TrackMutation = {
    album: req.body.album,
    name: req.body.name,
    time: req.body.time,
  };

  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tracksRouter;