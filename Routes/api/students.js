const route = require('express').Router()
const Student = require('../../db').Student

/**
 * GET requests
 */
// Fetch all Students from database
route.get('/', (req, res) => {
    Student.findAll({})
        .then((students) => {
            res.json(students)
        })
})

// Fetch Student with student Id
route.get('/:studentId', (req, res) => {
    Student.findById(parseInt(req.params.studentId))
        .then((student) => {
            res.json(student)
        })
})

route.get('/:studentId/batches', (req, res) => {
    res.send('students/id/batches')
})

/**
 * POST requests
 */
// Add new student to the database
route.post('/', (req, res) => {
    let student = new Student({
        name: req.body.name
    })
    student.save()
    res.json({
        success: true,
        student: student
    })
})

/**
 * PUT requests
 */
// Update student with given student Id
route.put('/:studentId', (req, res) => {

})

/**
 * DELETE requests
 */
// Delete student with given student Id
route.delete('/:studentId', (req, res) => {

})

module.exports = route