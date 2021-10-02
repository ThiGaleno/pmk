import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Form from './Form';

const Donors = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/cadastrar">
                    <Form />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Donors;

if (document.getElementById('app')) {
    ReactDOM.render(<Donors />, document.getElementById('app'));
}
