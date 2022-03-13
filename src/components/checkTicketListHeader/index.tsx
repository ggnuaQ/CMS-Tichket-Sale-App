import { AiOutlineSearch } from "react-icons/ai";
import styles from "./index.module.css";

const CheckTicketHeader = (props: { onFilter: Function, onExport: Function }) => {
  const { onFilter, onExport } = props;

  return (
    <div className={styles.ticketHeader}>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Tìm bằng số vé"
          onChange={e => onFilter(e.target.value.trim().toLowerCase())} />
        <button type="submit">
          <AiOutlineSearch size={24} />
        </button>
      </form>
      <div className={styles.buttons}>
        <button onClick={() => onExport()}>
          Xuất file (.csv)
        </button>
      </div>
    </div>
  );
};

export default CheckTicketHeader;
