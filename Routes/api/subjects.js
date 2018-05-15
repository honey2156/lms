const route = require('express').Router()
const Subject = require('../../db').Subject
const SubTeachMap = require('../../db').SubTeachMap
const Teacher = require('../../db').Teacher
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * GET requests
 */
route.get('/', (req, res) => {
    Subject.findAll({})
        .then((subjects) => {
            res.status(200).json(subjects)
        })
})

route.get('/:subjectId', (req, res) => {
    Subject.findById(parseInt(req.params.subjectId))
        .then((subject) => {
            res.status(200).json(subject)
        })
})

route.get('/:subjectId/teachers', (req, res) => {
    let Sid = req.params.subjectId

    SubTeachMap.findAll({
        where: {
            subjectId: Sid
        },
        attributes: ['teacherId']
    }).then((teacherIds) => {
        let teacherArray = []
        teacherIds.forEach((teacher) => {
            teacherArray.push(teacher.teacherId)
        })
        Teacher.findAll({
            where: {
                id: {
                    [Op.in]: teacherArray
                }

            }
        }).then((teacher) => {
            res.json(teacher)
        })
    })
})

/**
 * POST requests
 */
// Add new Subject to the database
route.post('/', (req, res) => {
    let subject = new Subject({
        name: req.body.name
    })
    subject.save()
    res.status(201).json({
        success: true,
        subject: subject
    })
})

/**
 * PUT requests
 */
// Update subject with given subject Id
route.put('/:subjectId', (req, res) => {
    Subject.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.subjectId
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
// Delete subject with given subject Id
route.delete('/:subjectId', (req, res) => {
    Subject.destroy({
            where: {
                id: req.params.subjectId
            }
        })
        .then(() => {
            res.json({
                success: true
            })
        })
})

module.exports = route