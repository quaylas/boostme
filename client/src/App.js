import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import './App.css';
import Header from '../src/Components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import NoMatch from "./pages/NoMatch";
import Dashboard from './pages/Dashboard';
import Success from './pages/Success';
import { StoreProvider } from './utils/GlobalState';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <div>
            <Header />
          
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/success" component={Success} />
            <Route component={NoMatch} />
            </Switch>
        </div>
      </StoreProvider>
    </Router>
    </ApolloProvider>
    
  );
}

export default App;
