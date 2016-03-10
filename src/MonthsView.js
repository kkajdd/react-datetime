'use strict';

var React = require('react'),
moment = require('moment')
;

var DOM = React.DOM;
var DateTimePickerMonths = React.createClass({

	getInitialState: function() {
    var state = this.getStateFromProps(this.props);
    if (state.open == undefined)
      state.open = !this.props.input;
    state.currentView = this.props.dateFormat ? this.props.viewMode : 'time';
    return state;
  },

  getStateFromProps: function(props) {
    var formats = null,
        date = props.value || props.defaultValue,
        selectedDate,
        viewDate;
    ;
    if (date && typeof date == 'string')
      selectedDate = props.viewDate;
    else if (date)
      selectedDate = props.viewDate;
    if (selectedDate && !selectedDate.isValid())
      selectedDate = null;
    viewDate = selectedDate ? selectedDate.clone().startOf("month") : this.localMoment().startOf("month");
    ;
    return {
      inputFormat: 'MMMM YYYY',
      viewDate: viewDate,
      selectedDate: selectedDate,
      inputValue: selectedDate ? selectedDate.format('MMMM YYYY') : (date || ''),
      open: props.open != undefined ? props.open : this.state && this.state.open
    };
  },

	render: function() {
		return DOM.div({ className: 'rdtMonths' },[
			DOM.table({ key: 'a'}, DOM.thead({}, DOM.tr({},[
				
				DOM.th({ key: 'year', className: 'rdtSwitch', onClick: this.props.showView('years'), colSpan: 2, 'data-value': this.state.viewDate.year()}, this.state.viewDate.year()),
				
			]))),
			DOM.table({ key: 'months'}, DOM.tbody({ key: 'b'}, this.renderMonths()))
		]);
	},

	renderMonths: function() {
		var date = this.props.selectedDate,
			month = this.props.viewDate.month(),
			year = this.props.viewDate.year(),
			rows = [],
			i = 0,
			months = [],
			renderer = this.props.renderMonth || this.renderMonth,
			classes, props
		;
		this.props.viewDate.year([this.state.viewDate.year()]);
		while (i < 12) {
			classes = "rdtMonth";
			if( date && i === month && year === date.year() )
				classes += " rdtActive";

			props = {
				key: i,
				'data-value': i,
				className: classes,
				onClick: this.updateSelectedDate
			};

			months.push( renderer( props, i, year, date && date.clone() ));

			if( months.length == 4 ){
				rows.push( DOM.tr({ key: month + '_' + rows.length }, months) );
				months = [];
			}

			i++;
		}

		return rows;
	},

	updateSelectedDate: function( event ) {
		this.props.updateSelectedDate(event, true);
	},

	renderMonth: function( props, month, year, selectedDate ) {
		return DOM.td( props, this.props.viewDate.localeData()._monthsShort[ month ] );
	}
});

module.exports = DateTimePickerMonths;
