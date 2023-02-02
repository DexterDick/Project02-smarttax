const User = require('./User');
const TaxReport = require('./TaxReport');
const TaxOutput = require('./TaxOutput');

User.hasMany(TaxReport, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

TaxReport.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, TaxReport };
