import React, { useEffect } from 'react';
import Header from './component/Header/Header';
import Nav from './component/Nav/Nav';
import MoonToken from './component/MoonToken/MoonToken';
import KncStake from './component/KncStake/KncStake';

import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import useFetchingData from './component/Hooks/useFetchingData';

function App() {
  useFetchingData();

  return (
    <BrowserRouter >
      <div className="app">
        <Header />
        <main>
          <Nav />

          <Switch>
            <Route path="/token" exact component={MoonToken} />
            <Route path="/stake" exact component={KncStake} />
            <Redirect to="/stake" />
          </Switch>

        </main>

        <footer>
          <div>
            <a href="">FAQ</a>
            <a href="">Terms</a>
          </div>
          <span>© 2020 MoonPool. All rights reserved.</span>
        </footer>
      </div>
    </BrowserRouter >
  );
}

export default App;
