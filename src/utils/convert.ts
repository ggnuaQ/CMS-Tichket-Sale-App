const convertTicketStatusToVnm = (status: string) => {
  switch (status) {
    case "used":
      return "Đã sử dụng";
    case "not-used":
      return "Chưa sử dụng";
    case "expired":
      return "Hết hạn";
    default:
      return "";
  }
};

export { convertTicketStatusToVnm };
