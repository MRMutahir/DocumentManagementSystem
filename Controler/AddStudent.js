import Student from "../modalShema/StudentSchema.js";

async function addStudents(req, res, next) {
  try {
    const newStudent = await Student.create(req.body);
    await newStudent.save();
    res.status(201).json(" students has been added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addStudents, getAllStudents };
