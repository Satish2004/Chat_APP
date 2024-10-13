import mongoose from "mongoose";
//  ye model tab kaam ayeaga jab message ke anadar kya kya ho sakta hai means time kisne bheja kitte baje something like that!!!
// most imp thing that we have need to give ref like prinmary key and foreign key
// user se jo id generate ho moongoose khud objectId karta hai usko yaha ref lenge
const messageModel = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messageModel);

