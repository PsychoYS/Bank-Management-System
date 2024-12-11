const disputeService = require('../services/disputeService');

const createDispute = async (req, res) => {
    try {
        const { description } = req.body;
        const dispute = await disputeService.createDispute(req.user._id, description);
        res.status(201).json(dispute);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error creating dispute' });
    }
};

const getDisputes = async (req, res) => {
    try {
        const disputes = await disputeService.getDisputes(req.user._id);
        res.status(200).json(disputes);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetching disputes' });
    }
};

const getAllDisputes = async (req, res) => {
    try {
        const disputes = await disputeService.getAllDisputes(req.user);
        res.status(200).json(disputes);
    } catch (error) {
        const status = error.message === 'Not authorized' ? 403 : 500;
        res.status(status).json({ message: error.message || 'Error fetching all disputes' });
    }
};

const updateDisputeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const dispute = await disputeService.updateDisputeStatus(req.user, id, status);
        res.status(200).json(dispute);
    } catch (error) {
        const status = 
            error.message === 'Not authorized' ? 403 :
            error.message === 'Dispute not found' ? 404 : 500;
        res.status(status).json({ message: error.message || 'Error updating dispute status' });
    }
};

module.exports = {
    createDispute,
    getDisputes,
    getAllDisputes,
    updateDisputeStatus
}; 