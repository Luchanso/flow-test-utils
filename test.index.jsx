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

const modifyCat = (state = {}) => setIn(state, 'cat', { name: 'Barsik', age: 5 });

describe('bdd tests', () => {
    it('should create and modify', () => {
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

    it('should work with best style', () => {
        const {
            store, wrapper, getActions, getState, dispatch, clearActions
        } = mountWithStore(<CatContainer />, modifyCat2());

        expect(wrapper.toMatchSnapshot());
        dispatch(setAge(6));
        expect(wrapper).toMatchSnapshot());
        expect(getActions()).toMatchSnapshot();
        expect(getState()).toMatchSnapshot());
        clearActions();
    });
});
