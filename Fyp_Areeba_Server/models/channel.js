const { Schema, model } = require("mongoose");

const channelSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    vetId: {
        type: Schema.Types.ObjectId,
        ref: "Vet",
    },
},
    {
        timestamps: true,
    }
);

module.exports = model("channels", channelSchema);