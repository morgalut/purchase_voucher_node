const VoucherService = require('../services/voucherService');

class VoucherController {
    async createVoucher(req, res) {
        const { amount, cost, company } = req.body;
    
        // Check for required fields
        if (!amount || !cost || !company) {
            return res.status(400).json({
                error: 'Amount, cost, and company are required.',
                details: 'Ensure that the request body contains `amount`, `cost`, and `company` fields.'
            });
        }
    
        try {
            // Create a new voucher
            const voucher = await VoucherService.createVoucher(amount, cost, company);
            res.status(201).json({
                message: 'Voucher created successfully.',
                voucher
            });
        } catch (error) {
            res.status(400).json({
                error: 'Failed to create voucher.',
                details: error.message
            });
        }
    }

    async getVoucherById(req, res) {
        const { id } = req.params;
        try {
            const voucher = await VoucherService.getVoucherById(id);
            if (!voucher) {
                return res.status(404).json({
                    error: 'Voucher not found.',
                    details: `No voucher found with ID ${id}.`
                });
            }
            res.status(200).json({
                message: 'Voucher retrieved successfully.',
                voucher
            });
        } catch (error) {
            res.status(404).json({
                error: 'Failed to retrieve voucher.',
                details: error.message
            });
        }
    }

    async getAllVouchers(req, res) {
        try {
            const vouchers = await VoucherService.getAllVouchers();
            if (vouchers.length === 0) {
                return res.status(404).json({
                    message: 'No vouchers found.',
                    details: 'The vouchers collection is empty.'
                });
            }
            res.status(200).json({
                message: 'Vouchers retrieved successfully.',
                vouchers
            });
        } catch (error) {
            res.status(400).json({
                error: 'Failed to retrieve vouchers.',
                details: error.message
            });
        }
    }

    async updateVoucher(req, res) {
        const { id } = req.params;
        const { amount, cost, company } = req.body;
        try {
            const voucher = await VoucherService.updateVoucher(id, amount, cost, company);
            if (!voucher) {
                return res.status(404).json({
                    error: 'Voucher not found.',
                    details: `No voucher found with ID ${id}.`
                });
            }
            res.status(200).json({
                message: 'Voucher updated successfully.',
                voucher
            });
        } catch (error) {
            res.status(400).json({
                error: 'Failed to update voucher.',
                details: error.message
            });
        }
    }

    async deleteVoucher(req, res) {
        const { id } = req.params;
        try {
            const result = await VoucherService.deleteVoucher(id);
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    error: 'Voucher not found.',
                    details: `No voucher found with ID ${id}.`
                });
            }
            res.status(204).send({
                message: 'Voucher deleted successfully.'
            });
        } catch (error) {
            res.status(400).json({
                error: 'Failed to delete voucher.',
                details: error.message
            });
        }
    }
}

module.exports = new VoucherController();
