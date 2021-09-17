import React from 'react';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import './rsapp.scss';

const RSApp = (): JSX.Element => {
    return (
        <section id="rs-app">
            <Header />
            <Footer />
        </section>
    )
}

export default RSApp;