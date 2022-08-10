import { createImmerReducer } from "utils/ReducerUtils";
import { ReduxActionTypes } from "@appsmith/constants/ReduxActionConstants";
import { FocusEntity } from "navigation/FocusableEntity";
import { cursorState, evaluatedPaneState } from "navigation/FocusableElement";

export type FocusState = {
  entity: FocusEntity;
  entityId: string;
  elementName: string;
  moreInfo: {
    cursorState?: cursorState;
    evaluatedPaneState?: evaluatedPaneState;
  };
};

export type FocusHistory = Record<string, FocusState>;

export type FocusHistoryState = { focusInfo: FocusHistory };

const initialState: FocusHistoryState = {
  focusInfo: {},
};

/**
 * 1. Keep adding new focus events
 * 2. Maintain a max focus list (future)
 * 3. Quick search for focus state of a entity
 * */

const focusHistoryReducer = createImmerReducer(initialState, {
  [ReduxActionTypes.SET_FOCUS_HISTORY]: (
    state: FocusHistoryState,
    action: { payload: { key: string; focusState: FocusState } },
  ) => {
    const { focusState, key } = action.payload;
    state.focusInfo[key] = focusState;
  },
});

export default focusHistoryReducer;