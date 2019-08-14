import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Home from './Home';
// import Players from './Players';
// import Teams from './Teams';
import Navbar from './Navbar';
// import TeamPage from './TeamPage';
// import Articles from './Articles';
import DynamicImport from './DynamicImport';
import Loading from './Loading';

const Home = (props) => (
  //have a function that instead of getting data, gets the component itself
  //if not null pass in component itself passing in props
  //also need to pass DynamicImport a prop that we'll call load, so that when invoked it import the component specified.
  <DynamicImport load={() => import('./Home')}>
    {(Component) => Component === null
    ? <Loading />
    : <Component {...props} />}
  </DynamicImport>
)
const Players = (props) => (
  <DynamicImport load={() => import('./Players')}>
    {(Component) => Component === null
    ? <Loading />
    : <Component {...props} />}
  </DynamicImport>
)
const Teams = (props) => (
  <DynamicImport load={() => import('./Teams')}>
    {(Component) => Component === null
    ? <Loading />
    : <Component {...props} />}
  </DynamicImport>
)
const TeamPage = (props) => (
  <DynamicImport load={() => import('./TeamPage')}>
    {(Component) => Component === null
    ? <Loading />
    : <Component {...props} />}
  </DynamicImport>
)
const Articles = (props) => (
  <DynamicImport load={() => import('./Articles')}>
    {(Component) => Component === null
    ? <Loading />
    : <Component {...props} />}
  </DynamicImport>
)
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/players' component={Players} />
            <Route path='/teams' component={Teams} />
            <Route path='/:teamId' exact component={TeamPage} />
            <Route path='/:teamId/articles' component={Articles} />
            <Route render={() => <h1 className='text-center'>Four oh Four!</h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;


//https://github.com/tylermcginnis/React-Router-Course-Project/tree/given-code