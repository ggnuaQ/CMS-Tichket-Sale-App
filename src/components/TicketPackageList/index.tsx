import styles from "./index.module.css";
import { useMediaQuery } from "react-responsive";
import MobileCard from "./MobileCard";
import Paginator from "../paginator";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export interface IPackTicket {
  id: string;
  expirationDate: string;
  applicableDate: string;
  comboPrice: number;
  price: number;
  code: string;
  name: string;
  status: boolean;
}

export const MAX_ITEMS = 10;

const TicketPackageList = (props: { list: IPackTicket[], onEdit: Function }) => {
  const { list, onEdit } = props;
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [curPage, setCurPage] = useState(0);

  let listTicketMarkup = list.slice(curPage * MAX_ITEMS, (curPage + 1) * MAX_ITEMS).map((ticket, index) => (
    <li key={ticket.id} className={styles.ticketItem}>
      <span className={styles.no}>{index + 1}</span>
      <span>{ticket.code}</span>
      <span>{ticket.name}</span>
      <span>{ticket.applicableDate}</span>
      <span>{ticket.expirationDate}</span>
      <span>{ticket.price}</span>
      <span>{ticket.comboPrice}</span>
      <span>
        <div
          className={[
            styles.statusWrapper,
            ticket.status ? styles.notUsed : styles.expired,
            styles.notUsed,
          ].join(" ")}
        >
          <div className={styles.dot}></div>
          <div className={styles.status}>
            {ticket.status ? 'Đang áp dụng' : 'Tắt'}
          </div>
        </div>
      </span>
      <span>
        <button className={styles.updateBtn} onClick={() => onEdit(ticket)}>
          <FaEdit size={16} /> Cập nhật
        </button>
      </span>
    </li>
  ));

  if (isMobile) {
    listTicketMarkup = list
      .map((ticket, index) => (
        <MobileCard no={index + 1} key={ticket.id} ticket={ticket} onEdit={onEdit} />
      ));
  }

  return (
    <div>
      <ul className={styles.ticketList}>
        {!isMobile && (
          <li className={[styles.ticketItem, styles.ticketItemHead].join(" ")}>
            <strong className={styles.no}>STT</strong>
            <strong>Mã gói</strong>
            <strong>Tên gói vé</strong>
            <strong>Ngày áp dụng</strong>
            <strong>Ngày hết hạn</strong>
            <strong>Giá vé (VNĐ/Vé)</strong>
            <strong>Giá Combo (VNĐ/Combo)</strong>
            <strong>Tình trạng</strong>
            <strong />
          </li>
        )}
        {listTicketMarkup}
      </ul>
      {
        !isMobile && <Paginator
          curPage={curPage}
          maxPage={Math.ceil(list.length / MAX_ITEMS)}
          setCurPage={setCurPage}
          scrollAfterClicking={true}
          isLoading={false}
        />
      }
    </div>
  );
};

export default TicketPackageList;
