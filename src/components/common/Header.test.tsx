import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as renderer from 'react-test-renderer';

import { Header } from './Header';

test('has a valid snapshot', () => {
    const component = renderer.create(
        <BrowserRouter>
            <Header />
        </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
