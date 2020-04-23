const { Beneficiary } = require('../models')

class AdminController {
    static login_admin(req, res) {
        Beneficiary.findAll()
            .then(data => { res.render('benef_list', {data}) })
            .catch(err => { res.send(err.message) })
    }
}

module.exports = AdminController