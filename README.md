# flow-test-utils
Tools for TDD flow in declarative way

Example:
```jsx
const initialState = { cat: { name: "Barsik", age: 5 } };

it('Cat test', () => {
    const {
        store, wrapper, getActions, getState, dispatch
    } = mountWithStore(<CatContainer />, initialState);

    expect(wrapper.find('span').text()).toBe('Age: 5');
    dispatch(setAge(6));
    expect(wrapper.find('span').text()).toBe('Age: 6');
    expect(getActions()[0]).toEqual({ type: 'SET_AGE', payload: 6 });
    expect(getState().app.cat.name).toBe('Barsik');
});
```
