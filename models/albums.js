import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
},
    { timestamps: {updatedAt: 'LastUpdatedDate'} }
);

export const Album = mongoose.model("Album", albumSchema);