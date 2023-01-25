const sequelize = require('../config/connection');
const { User, TaxReport } = require('../models');

const userData = require('./userData.json');
const taxReportData = require('./taxReportData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const taxReport of taxReportData) {
        await TaxReport.create({
            ...taxReport,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
