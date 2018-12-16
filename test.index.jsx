import { combineReducers } from 'redux';
import { string, number } from 'prop-types';
import { connect } from 'react-redux';
import { flow, createStore, modifyStore, mount, dispatch, getState, wrapper } from '../index';
import setIn from '../../set-in';
import { simpleFunc2, simpleFunc1 } from '../bdd';

// --- test data ---

const initialCatState = { isLoading: true };
const SET_AGE = 'SET_AGE';
const setAge = age => ({ payload: age, type: SET_AGE });
const catReducer = (state = initialCatState, { type, payload }) => {
    if (type === SET_AGE) return { ...state, age: payload };
    return state;
};
const reducers = combineReducers({
    cat: catReducer
});
const middlewares = [];
const Cat = ({ name, age }) => (
    <div>
        <h1>{ name }</h1>
        <span>age: { age }</span>
    </div>
);
Cat.propTypes = {
    name: string.isRequired,
    age: number.isRequired
};
const CatContainer = connect(({ cat }) => ({
    name: cat.name,
    age: cat.age
}));

// --- begin test ---

const modifyCat = ({ store }) => setIn(store, 'cat', { name: 'Barsik', age: 5 });

describe('bdd tests', () => {
    it('should create and modify', () => {
        flow([simpleFunc1(), simpleFunc2()]);

        // expect(2).tobe(3);

        flow(
            createStore(reducers, middlewares),
            modifyStore(modifyCat),
            mount(CatContainer),
            getWrapper(wrapper => expect(wrapper.toMatchSnapshot())),
            dispatch(setAge(6)),
            getWrapper(wrapper => expect(wrapper).toMatchSnapshot()),
            getActions(actions => expect(actions).toMatchSnapshot()),
            getState(state => expect(state).toMatchSnapshot()),
            clearActions()
        );
    });
});
