const router = require('express').Router()
const DonorController = require('../controllers/donor')

router.get('/register', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: REGISTER, method: GET')
    next()
}, DonorController.add_donor)

router.post('/register', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: REGISTER, method: POST')
    next()
}, DonorController.added_donor)

router.get('/login', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: LOGIN, method: GET')
    next()
}, DonorController.login_donor)

router.post('/login', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: LOGIN, method: POST')
    const { email, password } = req.body
    if (email == 'admin@gmail.com' && password == 'admin') {
        res.redirect('/admin/login')
    }
    next()
}, DonorController.logged_in_donor)

router.get('/logout',(req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.negotiate(err);
        }
        next()
    })
}, DonorController.logout)

router.get('/edit/:id', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: EDIT, method: GET')
    next()
}, DonorController.edit_donor)

router.post('/edit/:id', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: EDIT, method: POST')
    next()
}, DonorController.edited_donor)

router.get('/topup/:id', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: TOPUP, method: GET')
    next()
}, DonorController.top_up_donors)

router.post('/topup/:id', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: TOPUP, method: POST')
    next()
}, DonorController.check_token)

router.get('/dashboard/:id', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: DASHBOARD, method: GET')
    next()
}, DonorController.dashboard_donor)

router.post('/dashboard/topup/:id/claim', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: DASHBOARD, method: POST')
    next()
}, DonorController.get_nominal)

router.get('/beneficiarylist/:id', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: BENEFICIARY, method: GET')
    next()
}, DonorController.list_beneficiary_from_dashboard)

router.post('/:id/donate/:benefId', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: DONATE, method: POST')
    next()
}, DonorController.donor_donate)

module.exports = router