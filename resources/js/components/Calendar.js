import React from "react";
import ReactDOM from 'react-dom';
import dateFns from "date-fns";
import vars from "../vars.json";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            startDate: new Date(),
            endDate: new Date()
        }
    }

    renderHeader() {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${this.isSelected(day) ? "selectedDate" : ""}${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    isSelected(day) {
        if ((dateFns.isWithinRange(day, this.state.startDate, this.state.endDate)) || day === this.state.startDate) {
            return true;
        }
        return false;
    }

    onDateClick(day) {
        this.setState({
            selectedDate: day
        });
    };

    setStartDate(){
        this.setState({
            startDate: this.state.selectedDate
        });
    }
    
    setEndDate() {
        this.setState({
            endDate: this.state.selectedDate
        });
    }

    nextMonth() {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth() {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    addDates() {
        fetch(vars.APP_URL && '/board/addDate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            body: JSON.stringify({
                startDate: dateFns.addDays(this.state.startDate, 1),
                endDate: dateFns.addDays(this.state.endDate, 1)
            }),
        });
    }

    render() {
        return (
            <div>
                <div>
                    <button type="button" onClick={() => this.setStartDate()}>Set start date</button>
                    <span>{dateFns.format(this.state.startDate, 'DD/MM/YYYY')}</span>
                    <button type="button" onClick={() => this.setEndDate()}>Set end date</button>
                    <span>{dateFns.format(this.state.endDate, 'DD/MM/YYYY')}</span>
                    <button type="button" onClick={() => this.addDates()}>Add dates to group</button>
                </div>
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
            </div>
        );
    }
}

export default Calendar;


if (document.getElementById('calendar')) {
    ReactDOM.render(<Calendar />, document.getElementById('calendar'));
}