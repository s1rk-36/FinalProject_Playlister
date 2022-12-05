const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        likes: { type: [String], required: false },
        dislikes: { type: [String], required: false },
        listens: { type: Number, required: false },
        comments: { type: [String], required: false },
        public: { type: Boolean, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
