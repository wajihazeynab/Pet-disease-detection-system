const { Schema, model } = require("mongoose");


const FavoriteSchema = new Schema({
    vet: {
        type: Schema.Types.ObjectId,
        ref: "Vet",
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = model("favorites", FavoriteSchema);
