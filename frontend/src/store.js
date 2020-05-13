import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

// 리덕스 스토어를 생성합니다. 스토어는 단 하나입니다!
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware()),
);
