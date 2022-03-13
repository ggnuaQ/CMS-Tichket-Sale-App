import {
  HIDE_SIDEBAR,
  SHOW_SIDEBAR,
  SHOW_FILTER_PANEL,
  HIDE_FILTER_PANEL,
  SHOW_TICKET_PACKAGE_FORM,
  HIDE_TICKET_PACKAGE_FORM,
} from "../types";

const initialState = {
  sidebar: {
    isShow: false,
  },
  ticketFilterPanel: {
    isShow: false,
  },
  ticketPackageForm: {
    isShow: false,
    ticketPackage: null,
  },
};

const globalReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        sidebar: { isShow: true },
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        sidebar: { isShow: false },
      };
    case SHOW_FILTER_PANEL:
      return {
        ...state,
        ticketFilterPanel: { isShow: true },
      };
    case HIDE_FILTER_PANEL:
      return {
        ...state,
        ticketFilterPanel: { isShow: false },
      };
    case SHOW_TICKET_PACKAGE_FORM:
      return {
        ...state,
        ticketPackageForm: {
          isShow: true,
          ticketPackage: action.payload,
        },
      };
    case HIDE_TICKET_PACKAGE_FORM:
      return {
        ...state,
        ticketPackageForm: {
          isShow: false,
          ticketPackage: null,
        },
      };
    default:
      return state;
  }
};

export default globalReducer;
