const route = require('express').Router()
const Batch = require('../../db').Batch

/**
 * GET requests
 */
// Fetch all Batches from database
route.get('/', (req, res) => {
    Batch.findAll({})
        .then((batches) => {
            res.json(batches)
        })
})

// Fetch Batch with batch Id
route.get('/:batchId', (req, res) => {
    Batch.findById(parseInt(req.params.batchId))
        .then((batch) => {
            res.json(batch)
        })
})

/**
 * POST requests
 */
// Add new batch to the database
route.post('/', (req, res) => {
    let batch = new Batch({
        name: req.body.name,
        courseId: req.body.courseId
    })
    batch.save()
    res.json({
        success: true,
        batch: batch
    })
})

/**
 * PUT requests
 */
// Update batch with given batch Id
route.put('/:batchId', (req, res) => {

})

/**
 * DELETE requests
 */
// Delete batch with given batch Id
route.delete('/:batchId', (req, res) => {

})

module.exports = route