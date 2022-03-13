import { convertTicketStatusToVnm } from "../../utils/convert";
import { ITicket } from "./index";
import styles from "./index.module.css";

const MobileCard = (props: { ticket: ITicket, no: number }) => {
  const { ticket, no } = props;
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
            Booking code
          </strong>
          <p>
            {ticket.bookingCode}
          </p>
        </div>
        <div className="col">
          <strong>
            Số vé
          </strong>
          <p>
            {ticket.id}
          </p>
        </div>
        <div className="col">
          <strong>
            Tình trạng sử dụng
          </strong>
          <div
            className={[
              styles.statusWrapper,
              ticket.status === "expired" ? styles.expired : "",
              ticket.status === "not-used" ? styles.notUsed : "",
            ].join(" ")}
          >
            <div className={styles.dot}></div>
            <div className={styles.status}>{convertTicketStatusToVnm(ticket.status)}</div>
          </div>
        </div>
        <div className="col">
          <strong>
            Ngày sử dụng
          </strong>
          <p>
            {ticket.usedDate}
          </p>
        </div>
        <div className="col">
          <strong>
            Ngày xuất vé
          </strong>
          <p>
            {ticket.createdDate}
          </p>
        </div>
        <div className="col">
          <strong>
            Cổng check - in
          </strong>
          <p>
            {ticket.checkInPort ? `Cổng ${ticket.checkInPort}` : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
