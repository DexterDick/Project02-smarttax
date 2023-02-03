const router = require('express').Router();
const { TaxReport } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a tax report
router.post('/', withAuth, async (request, response) => {
    try {
        const newTaxReport = await TaxReport.create({
            ...request.body,
            user_id: request.session.user_id,
        });

        request.session.save(() => {
            request.session.report_id = newTaxReport.id;
            response.status(200).json(newTaxReport);
        });

    } catch (error) {
        response.status(400).json(error);
    }
});

// Delete a tax report based on id
router.delete('/:id', withAuth, async (request, response) => {
    try {
        const taxReportData = await TaxReport.destroy({
            where: {
                id: request.params.id,
                user_id: request.session.user_id,
            },
        });

        if (!taxReportData) {
            response.status(404).json({ message: 'No tax report found with this id!' });
            return;
        }

        response.status(200).json(taxReportData);
    } catch (error) {
        response.status(500).json(error);
    }
});

// Update a tax report based on id
router.put('/:id', withAuth, async (request, response) => {
    console.log(request.body);
    try {
        const reportId = request.params.id;
        const {year, income} = request.body;

        const taxReportData = await TaxReport.update({
            year: year,
            income: income
        }, { where: {id: reportId} });
        
        response.json({ taxReport: taxReportData, message:'Tax report updated successfully!' });

    }catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;
