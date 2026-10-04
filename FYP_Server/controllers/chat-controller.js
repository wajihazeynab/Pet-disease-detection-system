const Channel = require("../models/channel");
const Chat = require("../models/chat");
const HttpError = require("../utils/http-error");


async function createChannel(data) {

  const { userId, vetId } = data
  console.log(data)
  let channel;
  try {
    channel = new Channel({
      userId,
      vetId,
    })
    await channel.save()
    return channel
  } catch (err) {
    return false
  }

}
async function sendMessage(data) {
  const { channelId, sender, message } = data;


  let conversation;
  try {
    console.log('first')
    // If conversation does not exist,create a new one
    conversation = new Chat({
      channelId,
      sender,
      message
    })
    await conversation.save();
    let chat = await Chat.find({ channelId })
    return chat
  } catch (err) {
    return []
  }


}

async function getConversations(id) {
  // const { authUser } = req;
  try {
    const conversation = await Chat.find({ channelId: id })

    return conversation
  } catch (err) {
    return []
  }
}

async function getMessages(req, res, next) {
  const { id } = req.params;
  const { authUser } = req;

  try {
    const conversation = await Chat.findById(id);

    if (conversation.user != authUser._id && conversation.vet != authUser._id) {
      const error = HttpError.unauthorized("You are not authorized to access this chat");
      return next(error);
    }

    return res.status(200).json(conversation);
  } catch (err) {
    const error = HttpError.internal();
    return next(error);
  }
}

async function selectChannel(req, res) {

  const { vetId, userId } = req.body;

  try {
    const conversation = await Channel.findOne({ vetId, userId });
    if (conversation) {
      return res.status(200).json(conversation);
    }

  } catch (err) {
    return res.status(500).json(err.message)
  }
}


async function findChannel(id) {
  console.log('first', id)
  try {
    // let listChannel = await Channel.find({ $or: [{ vetId: id }, { userId: id }] }).aggregate([$lookup:])
    let listChannel = await Channel.aggregate([
      // {
      //   $match: {
      //     $or: [{ vetId: {$eq :id} }, { userId: {$eq :id} }]
      //   }
      // },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userData',
        }
      },
      {
        $lookup: {
          from: 'vets',
          localField: 'vetId',
          foreignField: '_id',
          as: 'vetData',
        }
      }
    ])
    console.log(listChannel)
    const arr = listChannel.filter(e => e.userId == id || e.vetId == id)
    console.log(arr)
    return arr
  }
  catch (err) {
    return false
  }

}

module.exports = {
  sendMessage,
  getConversations,
  getMessages,
  createChannel,
  findChannel,
  selectChannel
};

