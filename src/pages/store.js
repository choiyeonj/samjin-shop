import {configureStore, createSlice} from '@reduxjs/toolkit';

// user_state
const user = createSlice({
    name: 'user',
    //initialState: '최연정',
    initialState: {name: '최연정', memberYear: 1},

    reducers: {
        // changeName() {
        //     return '이나겸';
        // },
        // changeName(state) {
        // 단순 값은 return으로 돌려받음
        //     return state + ' : NickName';
        // },
        changeName(state) {
            //객체나 배열은 return으로 돌릴 필요가 없다. (메모리에 저장되어 있는 값을 가져오면 되기 때문)
            state.name = state.name + ' : NickName';
        },
        changeYear(state, action) {
            state.memberYear += action.payload; // action은 변경을 처리
        },
    }, // reducers
}); // createSlice

export const {changeName, changeYear} = user.actions; // actions : 변경함수

// cart_state
const cart = createSlice({
    name: 'cart',
    initialState: [], // state를 배열로 받았기 때문에 Cart안에 받는 state도 배열로 받아야함
    reducers: {
        addItem(state, action) {
            //state.push(action.payload);
            const index = state.findIndex((findId) => {
                return findId.id === action.payload.id;
            });
            if (index > -1) {
                state[index].count++;
            } else {
                state.push(action.payload);
            }
        }, // addItem

        deleteItem(state, action) {
            const index = state.findIndex((findId) => {
                return findId.id === action.payload;
            });
            state.splice(index, 1);
        }, // deleteItem

        addCount(state, action) {
            const index = state.findIndex((findId) => {
                return findId.id === action.payload;
            });
            state[index].count++;
        },
        subCount(state, action) {
            const index = state.findIndex((findId) => {
                return findId.id === action.payload;
            });
            if (state[index].count > 1) {
                state[index].count--;
            }
        },
    },
});

export const {addItem, deleteItem, addCount, subCount} = cart.actions;

export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer,
    },
});
