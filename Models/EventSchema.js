const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  userId:{
    type:Number,
    unique:true,
    required:[true,'userId is require']
  },
  name: {
    type: String,
    required: [true, "Name field is require"],
    minLength: [4, "Name should have more than 3 cahrecters"],
  },
  files:[{type: String}],
  tagline: {
    type: String,
    required: [true, "Tagline field is require"],
  },
  schedule: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, "Description is require"],
  },
  moderator: {
    type: String,
    required: [true, "Moderator is require"],
  },
  category: {
    type: String,
    required: [true, "Category is require"],
  },
  sub_category: {
    type: String,
    required: [true, "Sub_category is require"],
  },
  rigor_rank: {
    type: Number,
    required: [true, "rigor_rank is require"],
  },
  attendees: [{ type: Number }],
});

module.exports= mongoose.model("Event", EventSchema);
