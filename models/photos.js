import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    AlbumId: {
        type: String,
        required: true,
    },
    UserId: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    ImageURI: {
        type: String,
        required: true
    }
},
);

export const Photo = mongoose.model("Photo", photoSchema);