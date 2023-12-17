// studentSchema.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: String,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
