import React from 'react';
import { Link } from 'react-router-dom';

const RSNav = (): JSX.Element => {
    return (
        <nav id="rs-nav">
            <ul>
                <li><Link to="/">Bio</Link></li>
                <li><Link to="/test">Test</Link></li>
            </ul>
        </nav>
    )
}

export default RSNav;