const router = require('express').Router();
const { TaxReport, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (request, response) => {
    try {
        // Get all tax reports and JOIN with user data
        const taxReportData = await TaxReport.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const taxReports = taxReportData.map((taxReport) => taxReport.get({ plain: true }));

        // Pass serialized data and session flag into template
        response.render('homepage', {
            taxReports,
            logged_in: request.session.logged_in
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get('/taxReport/:id', withAuth, async (request, response) => {
    try {
        const taxReportData = await TaxReport.findByPk(request.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const taxReport = taxReportData.get({ plain: true });

        response.render('taxReport', {
            ...taxReport,
            logged_in: request.session.logged_in
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/account', withAuth, async (request, response) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(request.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: TaxReport }],
        });

        const user = userData.get({ plain: true });

        response.render('account', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get('/login', (request, response) => {
    // If the user is already logged in, redirect the request to another route
    if (request.session.logged_in) {
        response.redirect('/account');
        return;
    }

    response.render('login');
});

router.get('/accountCreation', (request, response) => {
    response.render('accountCreation');
});

// Use withAuth middleware to prevent access to route
router.get('/taxInputs', withAuth, async (request, response) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(request.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: TaxReport }],
        });

        const user = userData.get({ plain: true });

        response.render('taxInputs', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;
