import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Calendar from './calendar';

class Calendars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendars: JSON.parse(props.calendars)
        }
    }

    createList() {
        let list = [];
        let len = Object.keys(this.state.calendars).length;

        for (let i = 0; i < len; i++) {
            var temp = '/calendar/'+this.state.calendars[i].id;
            list.push(
                <p key={this.state.calendars[i].id} className="calendar">
                    <a href={temp} className="calendarSelect">
                        {this.state.calendars[i].name}
                    </a>
                    <a className="addUser">
                        Add users
                    </a>
                </p>
            );
        }

        return list;
    }

    render() {
        return (
            <Router>
                <div>
                    {this.createList()}
                </div>
            </Router>
        );
    }
}

export default Calendars;

if (document.getElementById('calendars')) {
    const component = document.getElementById('calendars');
    const props = Object.assign({}, component.dataset);

    ReactDOM.render(<Calendars {...props}/>, component);
}