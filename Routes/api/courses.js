const route = require('express').Router()
const Course = require('../../db').Course
const Batch = require('../../db').Batch
const Lecture = require('../../db').Lecture
const Student = require('../../db').Student
const StudentBatchMap = require('../../db').StudentBatchMap
const SubTeachMap = require('../../db').SubTeachMap
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * GET requests
 */
route.get('/', (req, res) => {
    Course.findAll({})
        .then((courses) => {
            res.json(courses)
        })
})

route.get('/:courseId', (req, res) => {
    Course.findById(parseInt(req.params.courseId))
        .then((course) => {
            res.json(course)
        })
})

route.get('/:courseId/batches', (req, res) => {
    Batch.find({
            where: {
                courseId: req.params.courseId
            }
        })
        .then((batches) => {
            if (batches) {
                res.status(200).json(batches)
            } else {
                res.status(404).json({
                    error: 'No batch found'
                })
            }
        })
})

route.get('/:courseId/batches/:batchId', (req, res) => {
    Batch.find({
            where: {
                courseId: req.params.courseId,
                id: req.params.batchId
            }
        })
        .then((batch) => {
            if (batch) {
                res.status(200).json(batch)
            } else {
                res.status(404).json({
                    error: 'No batch found'
                })
            }
        })
})

route.get('/:courseId/batches/:batchId/lectures', (req, res) => {
    Lecture.find({
            where: {
                batchId: req.params.batchId
            }
        })
        .then((lectures) => {
            if (lectures) {
                res.status(200).json(lectures)
            } else {
                res.status(404).json({
                    error: 'No lectures found'
                })
            }
        })
})

route.get('/:courseId/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.find({
            where: {
                batchId: req.params.batchId,
                id: req.params.lectureId
            }
        })
        .then((lecture) => {
            if (lecture) {
                res.status(200).json(lecture)
            } else {
                res.status(404).json({
                    error: 'No lecture found'
                })
            }
        })
})

route.get('/:courseId/batches/:batchId/students', (req, res) => {
    StudentBatchMap.findAll({
            where: {
                batchId: req.params.batchId
            },
            attributes: ['studentId']
        })
        .then((studentIds) => {
            stuIds = []
            studentIds.forEach(element => {
                stuIds.push(element.studentId)
            });
            Student.findAll({
                    where: {
                        id: {
                            [Op.in]: stuIds
                        }
                    }
                })
                .then((students) => {
                    res.json(students)
                })

        })
})

route.get('/:courseId/batches/:batchId/teachers', (req, res) => {
    res.send('courses/id/batches/id/teachers')
})

/**
 *  POST requests
 */
// Add new course to database
route.post('/', (req, res) => {
    let course = new Course({
        name: req.body.name
    })
    course.save()
    res.json({
        success: true,
        course: course
    })
})

route.post('/:courseId/batches', (req, res) => {
    Course.findOne({
            where: {
                id: req.params.courseId
            }
        })
        .then((course) => {
            Batch.create({
                    name: req.body.name
                })
                .then((batch) => {
                    batch.setCourse(course, {
                        save: false
                    })
                    batch.save()
                    res.status(201).json(batch)
                })
        })
        .catch((err) => {
            res.status(501).json({
                error: 'could not add batch' + err
            })
        })
})

route.post('/:courseId/batches/:batchId/lectures', (req, res) => {
    Batch.findOne({
            where: {
                id: req.params.batchId
            }
        })
        .then((batch) => {
            Lecture.create({
                    name: req.body.name
                })
                .then((lecture) => {
                    lecture.setBatch(batch, {
                        save: false
                    })
                    lecture.save()
                    res.status(201).json(lecture)
                })
        })
        .catch((err) => {
            res.status(501).json({
                error: 'could not add lecture ' + err
            })
        })
})

route.post('/:courseId/batches/:batchId/students', (req, res) => {
    Batch.findOne({
            where: {
                id: req.params.batchId
            }
        })
        .then((batch) => {
            Student.create({
                    name: req.body.name
                })
                .then((student) => {
                    student.save()
                    StudentBatchMap.create({
                            batchId: batch.id,
                            studentId: student.id
                        })
                        .then((studentBatchMap) => {
                            studentBatchMap.save()
                            res.status(201).json(studentBatchMap)
                        })
                })
        })
})


/**
 * PUT requests
 */
// Update Course with given course Id
route.put('/:courseId', (req, res) => {
    Course.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.courseId
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
// Delete Course with given course Id
route.delete('/:courseId', (req, res) => {
    Course.destroy({
            where: {
                id: req.params.courseId
            }
        })
        .then(() => {
            res.json({
                success: true
            })
        })
})

module.exports = route