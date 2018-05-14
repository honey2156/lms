const route = require('express').Router()
const Subject = require('../../db').Subject

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
    res.send('subjects/id/teachers')
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