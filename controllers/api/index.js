const router = require('express').Router();
const userRoutes = require('./userRoutes');
const taxReportRoutes = require('./taxReportRoutes');

router.use('/users', userRoutes);
router.use('/taxReports', taxReportRoutes);

module.exports = router;