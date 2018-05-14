const route = require('express').Router()
const Lecture = require('../../db').Lecture

/**
 * GET requests
 */
route.get('/', (req, res) => {
    Lecture.findAll({})
        .then((lectures) => {
            res.json(lectures)
        })
})

route.get('/:lectureId', (req, res) => {
    Lecture.findById(parseInt(req.params.lectureId))
        .then((lecture) => {
            res.json(lecture)
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
    res.json({
        success: true,
        lecture: lecture
    })
})

/**
 * PUT requests
 */
// Update Lecture with given lecture Id
route.put('/:lectureId', (req, res) => {

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