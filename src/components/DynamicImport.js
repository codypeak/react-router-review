import { Component } from 'react';

export default class DynamicImport extends Component {
    state = {
        component: null
    }

    //dynamically imports module on load. and will return a promise with the module
    //then call setstate to update the component on state
    componentDidMount() {
        this.props.load()
            .then((mod) => this.setState(() => ({
                component: mod.default
            })))
    }


    render() {
        return this.props.children(this.state.component)
    }
}