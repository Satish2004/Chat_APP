import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId } from "../socket/socket.js";

//SEND-Message
export const sendMessage = async (req, res) => {
  try {
    // jo message kr rha hai uska and ek receiver

    const senderId = req.id; // logged in already
    const receiverId = req.params.id;
    const { message } = req.body;

    //conversation --> kiske kiske bich sender and receiver ke bich me
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    // const newMessage means message kya hai? we take from the messageModel.js cerate newMessage

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    // await gotConversation.save();
    await Promise.all([gotConversation.save(), newMessage.save()]);

    //socket IO implementation--->
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //1 Way communication--->
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
    //SOCKET IO
  } catch (error) {
    console.log(error);
  }
};

////GET-Message -->message ko le kon raha hai-->RECEIVER ID
export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    // conversation model me find kar rahe hi
    const conversation = await Conversation.findOne({
      participants: { $all: { senderId, receiverId } },
    }).populate("messages");
    // console.log(conversation.messages--> object return krega therefore we populate );
    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log(error);
  }
};
