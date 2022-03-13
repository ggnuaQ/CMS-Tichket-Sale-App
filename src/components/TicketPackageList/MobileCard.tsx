import { IPackTicket } from "./index";
import styles from "./index.module.css";
import { FaEdit } from "react-icons/fa";

const MobileCard = (props: { ticket: IPackTicket, no: number, onEdit: Function }) => {
  const { ticket, no, onEdit } = props;
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <strong>STT</strong>
          <p>
            {no}
          </p>
        </div>
        <div className="col">
          <strong>
            Mã gói
          </strong>
          <p>
            {ticket.code}
          </p>
        </div>
        <div className="col">
          <strong>
            Tên gói vé
          </strong>
          <p>
            {ticket.name}
          </p>
        </div>
        <div className="col">
          <strong>
            Ngày áp dụng
          </strong>
          <p>
            {ticket.applicableDate}
          </p>
        </div>
        <div className="col">
          <strong>
            Ngày hết hạn
          </strong>
          <p>
            {ticket.expirationDate}
          </p>
        </div>
        <div className="col">
          <strong>
            Giá vé (VNĐ/Vé)
          </strong>
          <p>
            {ticket.price}
          </p>
        </div>
        <div className="col">
          <strong>
            Giá Combo (VNĐ/Combo)
          </strong>
          <p>
            {ticket.comboPrice}
          </p>
        </div>
        <div className="col">
          <strong>
            Tình trạng
          </strong>
          <div
            className={[
              styles.statusWrapper,
              ticket.status ? styles.notUsed : styles.expired,
            ].join(" ")}
          >
            <div className={styles.dot}></div>
            <div className={styles.status}>{ticket.status ? 'Đang áp dụng' : 'Tắt'}</div>
          </div>
        </div>
        <div className="col">
          <button className={styles.updateBtn} onClick={() => onEdit(ticket)}>
            <FaEdit size={16} />  Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
