const router = require('express').Router()
const AdminController = require('../controllers/admin')

router.get('/', (req, res) => { res.send('admin') })

router.get('/login', (req, res, next) => {
    console.clear()
    console.log('Accessing routes: LOGIN, method: GET as: ADMIN')
    next()
}, AdminController.login_admin)

module.exports = router