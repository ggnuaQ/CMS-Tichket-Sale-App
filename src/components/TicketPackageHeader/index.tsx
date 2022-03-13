import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { showTicketPackageFormAction } from "../../store/actions";
import styles from "./index.module.css";

const TicketPackageHeader = (props: { onFilter: Function, onExport: Function }) => {

  const { onFilter, onExport } = props;

  const dispatch = useDispatch();

  return (
    <div className={styles.ticketHeader}>
      <form className={styles.form}>
        <input type="text" placeholder="Tìm bằng số vé" onChange={e => onFilter(e.target.value.trim())} />
        <button type="submit">
          <AiOutlineSearch size={24} />
        </button>
      </form>
      <div className={styles.buttons}>
        <button onClick={() => onExport()}>
          Xuất file (.csv)
        </button>
        <button onClick={() => dispatch(showTicketPackageFormAction(null))}>
          Thêm gói vé
        </button>
      </div>
    </div>
  );
};

export default TicketPackageHeader;
