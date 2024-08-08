    const Voucher = require('../models/Voucher');

    class VoucherService {
    async createVoucher(amount, cost, company) {
        const voucher = new Voucher({ amount, cost, company });
        await voucher.save();
        return voucher;
    }

    async getVoucherById(id) {
        const voucher = await Voucher.findById(id);
        if (!voucher) throw new Error('Voucher not found');
        return voucher;
    }

    async getAllVouchers() {
        return await Voucher.find();
    }

    async updateVoucher(id, amount, cost, company) {
        const voucher = await Voucher.findById(id);
        if (!voucher) throw new Error('Voucher not found');
        voucher.amount = amount;
        voucher.cost = cost;
        voucher.company = company;
        await voucher.save();
        return voucher;
    }

    async deleteVoucher(id) {
        await Voucher.findByIdAndDelete(id);
    }
    }

    module.exports = new VoucherService();
