const route = require('express').Router()
const Teacher = require('../../db').Teacher
const SubTeachMap = require('../../db').SubTeachMap
const Lecture = require('../../db').Lecture
const Batch = require('../../db').Batch
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
    let tId = req.params.teacherId

    SubTeachMap.findAll({
        where: {
            teacherId: tId
        },
        attributes: ['lectureId']
    }).then((lectureIds) => {
        let lectureArray = []
        lectureIds.forEach((lecture) => {
            console.log("here" + lecture.lectureId)
            lectureArray.push(lecture.lectureId)
        })
        console.log(lectureArray);
        Lecture.findAll({
            where: {
                id: {
                    [Op.in]: lectureArray
                }
            },
            attributes: ['batchId']
        }).then((batchIds) => {
            let batchArray = []
            batchIds.forEach((batch) => {
                console.log("here" + batch.batchId)
                batchArray.push(batch.batchId)
            })
            console.log("batchArray: " + batchArray)
            Batch.findAll({
                where: {
                    id: {
                        [Op.in]: batchArray
                    }
                }
            }).then((batch) => {
                res.json(batch);
            })
        })
    })
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