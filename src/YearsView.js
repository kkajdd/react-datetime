'use strict';

var React = require('react');

var DOM = React.DOM;
var DateTimePickerYears = React.createClass({
	render: function() {
		var year = parseInt(new Date().getFullYear());

		return DOM.div({ className: 'rdtYears' },[
			DOM.table({ key: 'a'}, DOM.thead({}, DOM.tr({},[
				
				DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2 }, (year-10) + '-' + (year + 2) ),
				
				]))),
			DOM.table({ key: 'years'}, DOM.tbody({}, this.renderYears( year-10 )))
		]);
	},

	renderYears: function( year ) {
		var years = [],
			i = -1,
			rows = [],
			renderer = this.props.renderYear || this.renderYear,
			selectedDate = this.props.selectedDate,
			classes, props
		;

		//year--;
		while (i < 13) {
			classes = 'rdtYear';
			if( i === -1 | i === 10 )
				classes += ' rdtOld';
			if( selectedDate && selectedDate.year() === year )
				classes += ' rdtActive';

			props = {
				key: year,
				'data-value': year,
				className: classes,
				onClick: this.updateSelectedDate
			};

			years.push( renderer( props, year, selectedDate && selectedDate.clone() ));

			if( years.length == 4 ){
				rows.push( DOM.tr({ key: i }, years ) );
				years = [];
			}

			year++;
			i++;
		}

		rows.push(DOM.tr({key:12},years.splice(0,1)));

		return rows;
	},

	updateSelectedDate: function( event ) {
		this.props.updateSelectedDate(event, true);
	},

	renderYear: function( props, year, selectedDate ){
		return DOM.td( props, year );
	}
});

module.exports = DateTimePickerYears;
