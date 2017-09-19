import { assign } from 'lodash';

import * as ui from './ui.actions';

export interface State {
  selectedParticipant: number | undefined;
  selectedQuestion: number | undefined;
  selectedOnDeckQuestion: number | undefined;
  selectedRaisedHandQuestion: number | undefined;
  selectedScreenedQuestion: number | undefined;
  screenedQuestionOrder: string;
  onDeckQuestionOrder: string;
}

const initialState: State = {
  selectedParticipant: undefined,
  selectedQuestion: undefined,
  selectedOnDeckQuestion: undefined,
  selectedRaisedHandQuestion: undefined,
  selectedScreenedQuestion: undefined,
  screenedQuestionOrder: 'desc',
  onDeckQuestionOrder: 'desc'
};

export function reducer(state = initialState, action: ui.Actions): State {
  switch (action.type) {
    case ui.SELECT_PARTICIPANT:
      return assign({}, state, {selectedParticipant: action.payload.id});
    case ui.DESELECT_PARTICIPANT:
      return assign({}, state, {selectedParticipant: undefined});
    case ui.SELECT_QUESTION:
      return assign({}, state, {selectedQuestion: action.payload.id});
    case ui.DESELECT_QUESTION:
      return assign({}, state, {selectedQuestion: undefined});
    case ui.SELECT_ONDECK_QUESTION:
      return assign({}, state, {selectedOnDeckQuestion: action.payload.id});
    case ui.DESELECT_ONDECK_QUESTION:
      return assign({}, state, {selectedOnDeckQuestion: undefined});
    case ui.SELECT_RAISED_HAND_QUESTION:
      return assign({}, state, {selectedRaisedHandQuestion: action.payload.id});
    case ui.DESELECT_RAISED_HAND_QUESTION:
      return assign({}, state, {selectedRaisedHandQuestion: undefined});
    case ui.SELECT_SCREENED_QUESTION:
      return assign({}, state, {selectedScreenedQuestion: action.payload.id});
    case ui.DESELECT_SCREENED_QUESTION:
      return assign({}, state, {selectedScreenedQuestion: undefined});
    case ui.SET_SCREENED_QUESTION_ORDER:
      return assign({}, state, {screenedQuestionOrder: action.payload.order});
    case ui.SET_ONDECK_QUESTION_ORDER:
      return assign({}, state, {onDeckQuestionOrder: action.payload.order});
    default:
      return state;
  }
}
