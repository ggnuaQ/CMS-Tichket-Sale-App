import styles from "./index.module.css";
import { useMediaQuery } from "react-responsive";
import MobileCard from "./MobileCard";
import { useState } from "react";
import Paginator from "../paginator";

export interface ICheckTicket {
  id: string;
  bookingCode: string;
  createdDate: string;
  checkInPort: string;
  typeName: string;
  ticketNumber: string;
  eventName: string;
  isChecked: boolean;
}

export const MAX_ITEMS = 10;

const CheckTicketList = (props: {
  list: ICheckTicket[];
  onCheck: Function;
}) => {
  const { list, onCheck } = props;
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [curPage, setCurPage] = useState(0);

  let listTicketMarkup = list
    .slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS)
    .map((ticket, index) => (
      <li key={ticket.id} className={styles.ticketItem}>
        <span className={styles.no}>{index + 1 + curPage * MAX_ITEMS}</span>
        <span>{ticket.ticketNumber}</span>
        <span>{ticket.createdDate}</span>
        <span>{ticket.typeName}</span>
        <span>{ticket.checkInPort ? `Cổng ${ticket.checkInPort}` : "-"}</span>
        <span
          className={[
            styles.check,
            ticket.isChecked ? styles.isChecked : "",
          ].join(" ")}
        >
          <span>{ticket.isChecked ? "Đã đối soát" : "Chưa đối soát"}</span>
          {ticket.isChecked ? null : (
            <button
              className={styles.checkBtn}
              style={{
                marginTop: 6,
              }}
              onClick={() => onCheck(ticket.id)}
            >
              Chốt
            </button>
          )}
        </span>
      </li>
    ));

  if (isMobile) {
    listTicketMarkup = list.map((ticket, index) => (
      <MobileCard no={index + 1} key={ticket.id} ticket={ticket} onCheck={onCheck} />
    ));
  }

  return (
    <div>
      <ul className={styles.ticketList}>
        {!isMobile && (
          <li className={[styles.ticketItem, styles.ticketItemHead].join(" ")}>
            <strong className={styles.no}>STT</strong>
            <strong>Số vé</strong>
            <strong>Ngày sử dụng</strong>
            <strong>Tên loại vé</strong>
            <strong>Cổng check - in</strong>
            <strong />
          </li>
        )}
        {listTicketMarkup}
      </ul>
      {!isMobile && (
        <Paginator
          curPage={curPage}
          maxPage={Math.ceil(list.length / MAX_ITEMS)}
          setCurPage={setCurPage}
          scrollAfterClicking={true}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default CheckTicketList;
