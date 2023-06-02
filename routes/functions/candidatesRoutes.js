const express = require('express')
const { getCandidates,
    getCandidate,
    createCandidate,
    deleteCandidate,
    updateCandidate} = require('../controllers/candidatesController')
const requireAuth = require ('../middleware/requireAuth')

const router = express.Router()

//must be before all routes
router.use(requireAuth)
//get all candidates
router.get('/', getCandidates)

//get a single candidate
router.get('/:id',getCandidate)

//add a new candidate
router.post('/',createCandidate)

//delete a candidate
router.delete('/:id', deleteCandidate)

//update a candidate
router.patch('/:id',updateCandidate)

module.exports = router 