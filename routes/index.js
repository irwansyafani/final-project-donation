const router = require('express').Router()
const donors = require('./donor')
const admin = require('./admin')
const beneficiary = require('./beneficiary')

router.get('/', (req, res) => { res.render('home')})
router.use('/admin', admin)
router.use('/donors', donors)
router.use('/beneficiary', beneficiary)
module.exports = router