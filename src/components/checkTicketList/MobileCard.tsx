import { ICheckTicket } from "./index";
import styles from "./index.module.css";

const MobileCard = (props: {
  ticket: ICheckTicket;
  no: number;
  onCheck: Function;
}) => {
  const { ticket, no, onCheck } = props;
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <strong>STT</strong>
          <p>{no}</p>
        </div>
        <div className="col">
          <strong>Số vé</strong>
          <p>{ticket.ticketNumber}</p>
        </div>
        <div className="col">
          <strong>Ngày sử dụng</strong>
          <p>{ticket.createdDate}</p>
        </div>
        <div className="col">
          <strong>Tên loại vé</strong>
          <p>{ticket.typeName}</p>
        </div>
        <div className="col">
          <strong>Cổng check - in</strong>
          <p>{ticket.checkInPort ? `Cổng ${ticket.checkInPort}` : "-"}</p>
        </div>
        <div className="col">
          <strong />
          <div
            className={[
              styles.check,
              ticket.isChecked ? styles.isChecked : "",
            ].join(" ")}
          >
            <span>{ticket.isChecked ? "Đã đối soát" : "Chưa đối soát"}</span>
            {ticket.isChecked ? null : (
              <button
                className={styles.checkBtn}
                onClick={() => onCheck(ticket.id)}
              >
                Chốt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
