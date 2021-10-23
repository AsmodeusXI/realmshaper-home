import { toPlainObject } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { RSTab } from '../rsapp/rsapp.types';

const RSNav = ({ tabs }): JSX.Element => {
    const navEntries = tabs
        .sort((a: RSTab, b: RSTab) => a.order - b.order)
        .map((tab: RSTab) =>
            <li><Link to={tab.location}>{tab.title}</Link></li>
        );

    return (
        <nav id="rs-nav">
            <ul>{navEntries}</ul>
        </nav>
    )
}

export default RSNav;