const router = require('express').Router()
const BeneficiaryController = require('../controllers/beneficiary')

router.get('/', (req, res, next) => {
    console.clear()
    console.log('Accessing toutes: /, method: GET')
    next()
}, BeneficiaryController.show)

router.get('/add', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: ADD BENEFICIARY, method: GET ')
    next()
}, BeneficiaryController.add)
router.post('/add', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: ADD BENEFICIARY, method: POST')
    next()
}, BeneficiaryController.added)

router.get('/:id/delete', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: DELETE, method: GET')
    next()
}, BeneficiaryController.delete)

module.exports = router