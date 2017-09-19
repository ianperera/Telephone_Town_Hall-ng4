import { Action } from '@ngrx/store';

export const SCREEN_NEXT_START = '[Question] Screen next start';
export const SCREEN_NEXT_SUCCESS = '[Question] Screen next success';
export const SCREEN_NEXT_FAILURE = '[Question] Screen next failure';
export const SCREEN_ID_START = '[Question] Screen id start';
export const SCREEN_ID_SUCCESS = '[Question] Screen id success';
export const SCREEN_ID_FAILURE = '[Question] Screen id failure';
export const SCREEN_FINISH_START = '[Question] Screen finish start';
export const SCREEN_FINISH_SUCCESS = '[Question] Screen finish success';
export const SCREEN_FINISH_FAILURE = '[Question] Screen finish failure';

export class ScreenNextStart implements Action {
  readonly type = SCREEN_NEXT_START;
}
export class ScreenNextSuccess implements Action {
  readonly type = SCREEN_NEXT_SUCCESS;
}
export class ScreenNextFailure implements Action {
  readonly type = SCREEN_NEXT_FAILURE;
}
export class ScreenIdStart implements Action {
  readonly type = SCREEN_ID_START;
}
export class ScreenIdSuccess implements Action {
  readonly type = SCREEN_ID_SUCCESS;
}
export class ScreenIdFailure implements Action {
  readonly type = SCREEN_ID_FAILURE;
}
export class ScreenFinishStart implements Action {
  readonly type = SCREEN_FINISH_START;
}
export class ScreenFinishSuccess implements Action {
  readonly type = SCREEN_FINISH_SUCCESS;
}
export class ScreenFinishFailure implements Action {
  readonly type = SCREEN_FINISH_FAILURE;
}

export type Actions =
  ScreenNextStart
  | ScreenNextSuccess
  | ScreenNextFailure
  | ScreenIdStart
  | ScreenIdSuccess
  | ScreenIdFailure
  | ScreenFinishStart
  | ScreenFinishSuccess
  | ScreenFinishFailure;
