var moment = require('moment');

module.exports = function(date) {
	return moment(date).format('MMMM DD, YYYY');
};
