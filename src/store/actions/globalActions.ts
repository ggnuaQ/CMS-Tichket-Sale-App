import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_FILTER_PANEL,
  HIDE_FILTER_PANEL,
  SHOW_TICKET_PACKAGE_FORM,
  HIDE_TICKET_PACKAGE_FORM,
} from "../types";

const showSidebarAction = () => ({ type: SHOW_SIDEBAR });

const hideSidebarAction = () => ({ type: HIDE_SIDEBAR });

const showFilterPanelAction = () => ({ type: SHOW_FILTER_PANEL });

const hideFilterPanelAction = () => ({ type: HIDE_FILTER_PANEL });

const showTicketPackageFormAction = (payload: any) => ({
  type: SHOW_TICKET_PACKAGE_FORM,
  payload,
});

const hideTicketPackageFormAction = () => ({ type: HIDE_TICKET_PACKAGE_FORM });

export {
  showSidebarAction,
  hideSidebarAction,
  showFilterPanelAction,
  hideFilterPanelAction,
  showTicketPackageFormAction,
  hideTicketPackageFormAction,
};
