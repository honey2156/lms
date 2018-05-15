const route = require('express').Router()
const Student = require('../../db').Student
const StudentBatchMap = require('../../db').StudentBatchMap
const Batch = require('../../db').Batch
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * GET requests
 */
// Fetch all Students from database
route.get('/', (req, res) => {
    Student.findAll({})
        .then((students) => {
            res.status(200).json(students)
        })
})

// Fetch Student with student Id
route.get('/:studentId', (req, res) => {
    Student.findById(parseInt(req.params.studentId))
        .then((student) => {
            res.status(200).json(student)
        })
})

route.get('/:studentId/batches', (req, res) => {
    StudentBatchMap.findAll({
            where: {
                studentId: req.params.studentId
            },
            attributes: ['batchId']
        })
        .then((batchIds) => {
            bIds = []
            batchIds.forEach(element => {
                bIds.push(element.batchId)
            });
            Batch.findAll({
                    where: {
                        id: {
                            [Op.in]: bIds
                        }
                    }
                })
                .then((batches) => {
                    res.status(200).json(batches)
                })

        })
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
    res.status(201).json({
        success: true,
        student: student
    })
})

// Enroll Student to batch
route.post('/:studentId/batches/:batchId', (req, res) => {
    StudentBatchMap.create({
        batchId: req.params.batchId,
        studentId: req.params.studentId
    })
    .then((studentBatchMap) => {
        studentBatchMap.save()
        res.status(201).json(studentBatchMap)
    })
})

/**
 * PUT requests
 */
// Update student with given student Id
route.put('/:studentId', (req, res) => {
    Student.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.studentId
            }
        })
        .then(() => {
            res.json({
                success: true
            })
        })
})

/**
 * DELETE requests
 */
// Delete student with given student Id
route.delete('/:studentId', (req, res) => {
    Student.destroy({
            where: {
                id: req.params.studentId
            }
        })
        .then(() => {
            res.json({
                success: true
            })
        })
})

module.exports = route