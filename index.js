import express from "express";
import mongoose from 'mongoose';
import { User } from "./models/users.js";
import { Album } from "./models/albums.js";
import { Photo } from "./models/photos.js";

const app = express();
const PORT = 4000;

//DB Connection
const url = 'mongodb+srv://Suparnan:Guvi%40123@cluster0.clkv3.mongodb.net/gallery'
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on('open', () => console.log("Database connected Successfully"))

//middleware
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Vela Seyyudhu !!!");
})

//Users API's
// 1. Get all Users
app.get('/users/getAll', async (request, response) => {
    try {
        const allUsers = await User.find({});
        console.log(allUsers);
        response.send(allUsers);
    } catch (err) {
        response.status();
        response.send(err);
    }
})

// 2. Get all Users by ID
app.get('/users/getUserById/:userId', async (request, response) => {
    const { userId } = request.params;
    try {
        const user = await User.find({ _id: { $eq: userId } });
        console.log(user);
        response.send(user);
    } catch (err) {
        response.status();
        response.send(err);
    }
})

// 3. Create a User
app.put('/users/create/:firstname/:lastname/:phonenumber', async (request, response) => {
    const { firstname, lastname, phonenumber } = request.params;

    try {
        const insertUser = await User.insertMany({ "Firstname": firstname, "Lastname": lastname, "Phonenumber": phonenumber });
        console.log(insertUser);
        response.send(insertUser);
    } catch (err) {
        console.log(err)
    }
})

// 4. Update a User
app.post('/users/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        if (!(userId && userId != '')) {
            response.status(400).send("Invalid User Id");
        }
        const existingUser = await User.findById(userId + '');
        console.log(existingUser);
        if (existingUser) {
            const user = request.body;
            console.log(73, user);
            const isUpdated = await User.updateOne({ "_id": { $eq: userId } }, { $set: { "Firstname": user.Firstname, "Lastname": user.Lastname, "Phonenumber": user.Phonenumber } });
            console.log(isUpdated);
            if (isUpdated) {
                response.send("User information updated successfully");
            } else {
                response.status(500).send("User update failed");
            }            
        } else {
            response.status(400).send("User not found");
        }
    } catch (err) {
        console.log(err);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 5. Delete a User
app.put('/users/remove/:userId', async (request, response) => {
    const { userId } = request.params;

    try {
        if (!(userId && userId != '')) {
            response.status(400).send("Invalid User Id");
        }
        const removeUser = await User.deleteOne({ "_id": { $eq: userId } });
        console.log(removeUser);
        response.send(removeUser);
    } catch (err) {
        console.error(err)
    }
})


// Albums
// 1. get album data
app.get('/album',async (request, response) => {
    try{
        const albumList = await Album.find({})
        console.log(albumList);
        response.send(albumList);
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 2. get one album by album id
app.get('/album/:albumId',async (request, response) => {
    const { albumId } = request.params
    try{
        const getParticularAlbum = await Album.find( { _id : { $eq : albumId } } );
        console.log(getParticularAlbum);
        response.send(getParticularAlbum);
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 3. get albums with user id with user information
app.get('/album/user/:userId',async (request, response) => {
    const { userId } = request.params
    try{
        const getAlbumByUser = await Album.find( { UserId : { $eq : userId } });
        const getUserInformation = await User.find( { _id : { $eq : userId } } );
        console.log(getAlbumByUser,getUserInformation,"there you are");
        response.send({getAlbumByUser,getUserInformation});
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 4. create album data
app.put('/album',async (request, response) => {
    try{
        const inputAlbum = request.body;
        const album = await Album.create({ "UserId": inputAlbum.UserId, "Name": inputAlbum.Name})
        console.log(album);
        response.send("Album created successfully");
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 5. update album data
app.post("/album/:albumId", async(request, response) => {
    try{
        const { albumId } = request.params;
        if(!(albumId && albumId != '')) {
            response.status(400).send("Invalid Album Id");
        }
        const existingAlbum = await Album.findById(albumId + '');
        console.log(existingAlbum);
        if(existingAlbum){
            const updateAlbum = request.body;
            console.log(updateAlbum);
            const albumIsUpdated = await Album.updateOne({ "_id" : { $eq : albumId }},{ $set : {"UserId" : updateAlbum.UserId, "Name" : updateAlbum.Name } });
            console.log(albumIsUpdated);
            if (albumIsUpdated) {
                response.send("Album updated successfully");
            } else {
                response.status(500).send("Album update failed");
            }            
        } else {
            response.status(400).send("Album not found");
        }

    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 6. Delete an Album
app.put('/album/remove/:albumId', async(request, response) => {
    try {
        const { albumId } = request.params;
        if(!(albumId && albumId != '')) {
            response.status(400).send("Invalid Album Id");
        }
        console.log(typeof(albumId),"here");
        const removeAlbum = await Album.deleteOne({ "_id": { $eq: albumId } });
        console.log(removeAlbum);
        response.send(removeAlbum);
    } catch (error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// Photos
// 1. Get all Photos
app.get('/photo',async (request, response) => {
    try{
        const photosList = await Photo.find({})
        console.log(photosList);
        response.send(photosList);
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 2. Get one Photo by Photo ID
app.get('/photo/:photoId',async (request, response) => {
    const { photoId } = request.params
    try{
        const getParticularPhoto = await Photo.find({_id:{$eq:photoId}});
        console.log(getParticularPhoto);
        response.send(getParticularPhoto);
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 3. Get Photos by Album ID with Album informationa and User Information
app.get('/photo/album/:albumId',async (request, response) => {
    const { albumId } = request.params
    try{
        if(!(albumId && albumId != '')) {
            response.status(400).send("Invalid Album Id");
        }
        const getPhotoByAlbum = await Photo.find( { AlbumId : { $eq : albumId } });
        const getAlbumInformation = await Album.find( { _id : { $eq : albumId } } );
        const getUserId = await Photo.find( { AlbumId : { $eq : albumId } },{ _id : 0, AlbumId : 0, Name : 0, ImageURI : 0, __v : 0 } );
        const userID = getUserId.map(ele => ele.UserId);
        const getUserInformation = await User.find( { _id : { $eq : userID[0] } } )
        console.log(getPhotoByAlbum, getAlbumInformation, getUserInformation,"Everything we want");
        response.send({getPhotoByAlbum, getAlbumInformation, getUserInformation});
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 4. Get Photos with User ID with User Information
app.get('/photo/user/:userId',async (request, response) => {
    const { userId } = request.params
    try{
        if(!(userId && userId != '')) {
            response.status(400).send("Invalid Album Id");
        }
        const getPhotoByUser = await Photo.find( { UserId : { $eq : userId } });
        // const getAlbumInformation = await Album.find( { _id : { $eq : albumId } } );
        const getUserId = await Photo.find( { UserId : { $eq : userId } },{ _id : 0, AlbumId : 0, Name : 0, ImageURI : 0, __v : 0 } );
        const userID = getUserId.map(ele => ele.UserId);
        const getUserInformation = await User.find( { _id : { $eq : userID[0] } } )
        console.log(getPhotoByUser, getUserInformation,"Everything we want");
        response.send({getPhotoByUser, getUserInformation});
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 5. Create Photo
app.put('/photo',async (request, response) => {
    try{
        const inputPhoto = request.body;
        const photo = await Photo.create({ "AlbumId": inputPhoto.AlbumId, "UserId": inputPhoto.UserId, "Name": inputPhoto.Name, "ImageURI": inputPhoto.ImageURI })
        console.log(photo);
        response.send("Photo added successfully");
        
    } catch(error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

// 6. Delete a Photo
app.put('/photo/remove/:photoId', async(request, response) => {
    try {
        const { photoId } = request.params;
        if(!(photoId && photoId != '')) {
            response.status(400).send("Invalid Photo Id");
        }
        console.log(typeof(photoId),"here");
        const removePhoto = await Photo.deleteOne({ "_id": { $eq: photoId } });
        console.log(removePhoto);
        response.send(removePhoto);
    } catch (error) {
        console.error(error);
        response.status(500).send("Something went wrong. Try agian later");
    }
});

app.listen(PORT, () => {
    console.log("The express server started successfully in:", +PORT);
});