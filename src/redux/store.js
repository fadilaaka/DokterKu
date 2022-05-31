import {legacy_createStore as createStore} from 'redux';

//const [profile, setProfile] = useState("mardinah")

//setProfile("Mardini")

const initialState = {
  loading: false,
  name: 'Andrini Martiah',
  address: 'jalan Bunga',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_NAME') {
    return {
      ...state,
      name: 'Jihan',
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
