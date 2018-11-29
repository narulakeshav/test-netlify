/**
 * @flow
 * External Dependencies
 */
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

/**
 * Internal Dependencies
 */
// eslint-disable-next-line
import './reset.css.js';

// Views/Routes
import Home from './views/home';

/**
 * Local Variables
 */
type Props = {};

/**
 * App Component
 * Defines and manages all the Routes.
 */
class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              component={Home}
              exact
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

// Export
export default App;
