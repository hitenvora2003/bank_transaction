const transaction = require('../model/transaction')

exports.pageview = async (req, res) => {
    try {

        const page = (req.query.page) || 1;
        const limit = (req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const transactions = await transaction.find().populate('account_Holdername').sort({ createdAt: -1 }).skip(skip).limit(limit)
        const totaltransactions = await transaction.countDocuments()
        res.status(200).json({
            status: 'success',
            message: 'data find successfuly',
            paginatinmessage: 'pagination successfuly',
            page, limit, totaltransactions,
            totaltransactionPages: Math.ceil(totaltransactions / limit),
            data: { transactions }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message

        })
    }
}
exports.createdata = async (req, res) => {
    try {
        let passdata = req.body

        const datas = await transaction.create(passdata)
        res.status(200).json({
            status: 'success',
            message: 'data create successfuly',
            data: datas
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message

        })
    }
}