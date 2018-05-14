const route = require('express').Router()
const Teacher = require('../../db').Teacher

/**
 * GET requests
 */
route.get('/', (req, res) => {
    Teacher.findAll({})
        .then((teachers) => {
            res.json(teachers)
        })
})

route.get('/:teacherId', (req, res) => {
    Teacher.findById(parseInt(req.params.teacherId))
        .then((teacher) => {
            res.json(teacher)
        })
})

route.get('/:teacherId/batches', (req, res) => {
    res.send('teachers/id/batches')
})

/**
 * POST requests
 */
// Add new Teacher to the database
route.post('/', (req, res) => {
    let teacher = new Teacher({
        name: req.body.name
    })
    teacher.save()
    res.json({
        success: true,
        teacher: teacher
    })
})

/**
 * PUT requests
 */
// Update Teacher with given subject Id
route.put('/:teacherId', (req, res) => {
    Teacher.update({
            name: req.body.name
        }, {
            where: {
                id: req.params.teacherId
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
// Delete Teacher with given subject Id
route.delete('/:teacherId', (req, res) => {
    Teacher.destroy({
            where: {
                id: req.params.teacherId
            }
        })
        .then(() => {
            res.json({
                success: true
            })
        })
})

module.exports = route