import {Component} from 'react'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: ""
        };
    }

    handleChange = (event) => {
        this.setState({ item: event.target.value });
    };

    handleAddItem = () => {
        const { item, list } = this.state;
        if (item.trim() !== "") {
            this.setState({
                list: [...list, item],
                item: ""
            });
        }
    };

    render() {
        return (
            <div>
                <h1>Todo List</h1>
                <input
                    type="text"
                    value={this.state.item}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleAddItem}>Add</button>

                <ul>
                    {this.state.list.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
