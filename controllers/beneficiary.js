const { Beneficiary } = require('../models')

class BeneficiaryController {
    static show(req, res) {
        Beneficiary.findAll()
            .then(benef => { res.render('benef_show', {benef}) })
            .catch(err => { res.send(err.message) })
    }

    static add(req, res) {
        res.render('add_beneficiary')
    }

    static added(req, res) {
        const { institution, target, head_of_institution } = req.body
        Beneficiary.create({ institution, target, head_of_institution })
            .then(data => { res.redirect('/admin/login') })
            .catch(err => { res.send(err.message) })
    }

    static delete(req, res) {
        const { id } = req.params
        Beneficiary.destroy({ where: { id } })
            .then(data => { res.redirect('/admin/login') })
            .catch(err => { res.send(err.message) })
    }   
}

module.exports = BeneficiaryController