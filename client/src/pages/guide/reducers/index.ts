import counterReducer from '../features/counter/counterSlice';
import userNameReducer from '../features/toggleName/userNameSlice'
import testSlice from '../features/toggleName/userApi'

export default {
    reducer: {
      counter: counterReducer,
      showName: userNameReducer,
      api: testSlice
    },
  }