import {
  GET_DATE,
  SET_NEWS,
  SET_LOADING,
  TOGGLE_SETTINGS,
  CHANGE_SOURCES
} from './types';

export default(state, action) => {
  switch(action.type) {
    case GET_DATE:
      return {
        ...state,
        all_rendered: false,
        date: action.payload
      }
      case SET_NEWS:
        return {
          ...state,
          news: action.show,
          stored_news: action.store,
          loading: false
        }
        case SET_LOADING:
          return {
            ...state,
            loading: true,
            all_rendered: true
          }
          case TOGGLE_SETTINGS:
            return {
              ...state,
              settings_on: action.payload
            }
          case CHANGE_SOURCES:
            return {
              ...state,
              chosen_src: action.payload
            }
    default:
      return state;
  }
}
