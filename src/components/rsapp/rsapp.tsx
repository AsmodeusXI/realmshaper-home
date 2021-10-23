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
import HabitGame from '../habitgame/habitgame';
import RSNav from '../rsnav/rsnav';
import './rsapp.scss';
import { RSTab } from './rsapp.types';

const RSApp = (): JSX.Element => {
    const tabs = [
        { order: 1, location: '/', title: 'Home', component: <Bio /> },
        { order: 2, location: '/test', title: 'Test', component: <p>Test</p> },
        { order: 3, location: '/habitgame', title: 'Habit Game', component: <HabitGame name='Habit Game' /> }
    ];

    const pageEntries = tabs
        .sort((a: RSTab, b: RSTab) => b.order - a.order)
        .map((tab: RSTab) => {
            return <Route path={tab.location}><p>{tab.component}</p></Route>
        });

    return (
        <Router>
            <section id="rs-app">
                <Header />
                <main id="rs-main">
                    <RSNav tabs={tabs} />
                    <section id="rs-page">
                        <Switch>{pageEntries}</Switch>
                    </section>
                </main>
                <Footer />
            </section>
        </Router>
    )
}

export default RSApp;
