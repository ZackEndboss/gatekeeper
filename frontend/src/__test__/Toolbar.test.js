import React from 'react';
import renderer from 'react-test-renderer';
import {MockStore} from './mockStore';
import {Provider} from 'react-redux';
import Toolbar from '../Toolbar';

describe('Toolbar component', () => {
    it('render', () => {
        const component = renderer.create(<Toolbar/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Toolbar load from state', () => {
    it('should load the state correctly', () => {
        const storeMock = MockStore({
            'gates': {
                'ftx': {
                    'gatekeeper': {
                        'test1': {},
                        'test2': {}
                    }
                }
            }
        });

        const subject = (
            <Provider store={storeMock}>
                <Toolbar/>
            </Provider>);
        const component = renderer.create(subject);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});