const {Donor, Topup, Beneficiary, DonorBeneficiary} = require('../models')
const generate_token = require('../helpers/generateToken')
const send = require('../helpers/email')

var sesssion_connect

class DonorController {
    static add_donor(req, res) {
        res.render('add_donor')   
    }

    static added_donor(req, res) {
        const { donor_name, email, password, confirm_password } = req.body
        if (password == confirm_password) {
            Donor.create({ donor_name, email, password })
                .then(data => {
                    res.redirect('/')
                })
                .catch(err => {
                    res.send(err.message)
                })
        } else {
            res.redirect('/donors/register')
        }
    }

    static login_donor(req, res) {
        res.render('login_donor')
    }

    static logged_in_donor(req, res, next) {
        const { email, password } = req.body
            Donor.findOne({where: { email, password }})
            .then(data => {
                req.session.userId = data.id
                res.redirect(`/donors/dashboard/${data.id}`)  
            })
            .catch(err => { res.send(err.message) })
    }

    static logout(req, res) {
        res.redirect('/')
    }

    static dashboard_donor(req, res) { // minta email biar bisa login
        const { id } = req.params
        console.log(req.session)
        if (req.session.userId == id) {
            Donor.findByPk(+id)
                .then(data => { 
                    DonorBeneficiary.findAll({ where: { DonorId: id }, include: [ Beneficiary ] })
                        .then(history => {
                            res.render('dashboard_donor', {data, history})
                        })
                 })
                .catch(err => { res.send(err.message) })
        } else {
            res.redirect('/donors/login')
        }
    }

    static edit_donor(req, res) {
        const {id} = req.params
        Donor.findByPk(+id)
            .then(data => {
                res.render('edit_donor', {data})
            })
            .catch(err => { res.send(err.message) })
    }

    static edited_donor(req, res) {
        const {id} = req.params
        const { donor_name, email, password, confirm_password } = req.body
        if (password == confirm_password) {
            Donor.update({donor_name, email, password}, { where: { id } })
                .then(data => { res.redirect(`/donors/dashboard/${id}`) })
                .catch(err => { res.send(err.message) })
        } else {
            res.send('input data error, check your form')
        }
    }

    static top_up_donors(req, res) {
        const {id} = req.params
        Donor.findByPk(+id)
            .then(data => { res.render('topup', {data}) })
            .catch(err => { res.send(err.message) })
    }

    static check_token(req, res) {
        const {id} = req.params
        const { nominal } = req.body
        const token = generate_token()
        Topup.create({ nominal, DonorId: id, token })
            .then(data => { 
                Donor.findByPk(+id)
                    .then(donor => {
                        send(donor.email, token, nominal)
                        res.redirect(`/donors/dashboard/${id}`) 
                    })
            })
            .catch(err => { res.send(err.message) })
    }

    static get_nominal(req, res) {
        const { id } = req.params
        const { token } = req.body
        Topup.findOne({ where: { token, status: false } })
            .then(data => { 
                if (data != null) {
                    Donor.findOne({ where: { id } })
                        .then(donor => {
                            if (data.dataValues.status == false){
                                donor.dataValues.credit += data.dataValues.nominal
                                Donor.update({ credit: donor.dataValues.credit }, { where: { id } })
                                    .then(data_donors => {
                                        Topup.update({ status: true }, { where: { token } })
                                            .then(data_topup => {
                                                res.redirect(`/donors/dashboard/${+id}`)
                                            })
                                    })
                            }
                        })
                }
                else res.redirect(`/donors/dashboard/${id}`)
            })
            .catch(err => { res.send(err.message) })
    }

    static list_beneficiary_from_dashboard(req, res) {
        const {id} = req.params
        Donor.findByPk(+id)
            .then(data => {
                Beneficiary.findAll()
                    .then(ben => {
                        res.render('benef_list_dashboard', {data, ben})
                    })
                    .catch(err => { res.send(err.message) })
            })
            .catch(err => { res.send(err.message) })
    }

    static donor_donate(req, res) {
        const { id, benefId } = req.params
        const { donate } = req.body
        Donor.findByPk(+id)
            .then(donor_id => {
                Beneficiary.findByPk(+benefId)
                    .then(benef_id => {
                        if (donor_id.credit >= donate) {
                            Donor.update({ credit: (donor_id.dataValues.credit -= +donate)}, { where: { id } })
                                .then(updonor => {
                                    Beneficiary.update({ credit: (benef_id.dataValues.credit += +donate) }, { where: { id: benefId } })
                                        .then(upbenef => {
                                            DonorBeneficiary.create({ DonorId: id, BeneficiaryId: benefId, amount: donate })
                                                .then(donor_benef => {
                                                    res.redirect(`/donors/beneficiarylist/${id}`)
                                                })
                                        })
                                })
                        } else {
                            res.send (`<h1>Can't Purchase, Make sure you credit is fit or greater than your donation</h1>`)
                        }
                    }) //

            }) //
    }
}
module.exports = DonorController