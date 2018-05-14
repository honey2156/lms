const route = require('express').Router()
const Lecture = require('../../db').Lecture

/**
 * GET requests
 */
route.get('/', (req, res) => {
    Lecture.findAll({})
        .then((lectures) => {
            res.status(200).json(lectures)
        })
})

route.get('/:lectureId', (req, res) => {
    Lecture.findById(parseInt(req.params.lectureId))
        .then((lecture) => {
            res.status(200).json(lecture)
        })
})

/**
 * POST requests
 */
// Add new Lecture to the database
route.post('/', (req, res) => {
    let lecture = new Lecture({
        name: req.body.name,
        batchId: req.body.batchId
    })
    lecture.save()
    res.status(201).json({
        success: true,
        lecture: lecture
    })
})

/**
 * PUT requests
 */
// Update Lecture with given lecture Id
route.put('/:lectureId', (req, res) => {
    Lecture.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.lectureId
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
// Delete Lecture with given lecture Id
route.delete('/:lectureId', (req, res) => {
    Lecture.destroy({
            where: {
                id: req.params.lectureId
            }
        })
        .then(() => {
            res.json({
                success: true
            })
        })
})

module.exports = route