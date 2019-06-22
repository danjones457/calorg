import React from "react";
import ReactDOM from 'react-dom';

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
            list.push(
                <p>
                    {this.state.calendars[i].name}
                </p>
            );
        }

        return list;
    }

    render() {
        return (
            <div>
                {this.createList()}
            </div>
        );
    }
}

export default Calendars;

if (document.getElementById('calendars')) {
    const component = document.getElementById('calendars');
    const props = Object.assign({}, component.dataset);

    ReactDOM.render(<Calendars {...props}/>, component);
}