const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
 const filters = {
        name: req.query.name || "",
        className: req.query.className|| "",
        section: req.query.section|| "",
        roll: req.query.roll|| ""
    };

    const students = await getAllStudents(filters); 
       res.status(200).json({ success: true, data: students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    const student = await addNewStudent(studentData);
    res.status(201).json({ success: true, message: "Student added successfully", data: student });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updatedStudent = await updateStudent(id, updateData);
    res.status(200).json({ success: true, message: "Student updated successfully", data: updatedStudent });
});


const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStudent = await setStudentStatus(id, status);
    res.status(200).json({ success: true, message: "Student status updated successfully", data: updatedStudent });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
