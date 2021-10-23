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
import RSNav from '../rsnav/rsnav';
import './rsapp.scss';

const RSApp = (): JSX.Element => {
    return (
        <Router>
            <section id="rs-app">
                <Header />
                <main id="rs-main">
                    <RSNav />
                    <section id="rs-page">
                        <Switch>
                            <Route path="/test"><p>Test.</p></Route>
                            <Route path="/"><Bio /></Route>
                        </Switch>
                    </section>
                </main>
                <Footer />
            </section>
        </Router>
    )
}

export default RSApp;