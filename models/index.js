const User = require('./User');
const TaxReport = require('./TaxReport');

User.hasMany(TaxReport, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

TaxReport.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, TaxReport };
