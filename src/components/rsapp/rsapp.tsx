import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import Bio from '../bio/bio';
import './rsapp.scss';

const RSApp = (): JSX.Element => {
    return (
        <Router>
            <section id="rs-app">
                <Header />
                <main id="rs-main">
                    <nav id="rs-nav">
                        <ul>
                            <li>
                                <Link to="/">Bio</Link>
                            </li>
                            <li>
                                <Link to="/test">Test</Link>
                            </li>
                        </ul>
                    </nav>
                    <section id="rs-page">
                        <Switch>
                            <Route path="/test">
                               <p>Test.</p>
                            </Route>
                            <Route path="/">
                                <Bio />
                            </Route>
                        </Switch>
                    </section>
                </main>
                <Footer />
            </section>
        </Router>
    )
}

export default RSApp;