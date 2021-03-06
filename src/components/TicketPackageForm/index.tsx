import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./index.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { hideTicketPackageFormAction } from "../../store/actions/globalActions";

const TicketPackageForm = (props: { onSubmit: Function }) => {
  const { onSubmit } = props;

  const { ticketPackageForm } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const [applicableDate, setApplicableDate] = useState(new Date());
  const [showApplicableDate, setShowApplicableDate] = useState(false);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showExpirationDate, setShowExpirationDate] = useState(false);

  const [formState, setFormState] = useState({
    comboPrice: 0,
    price: 0,
    code: "",
    name: "",
    status: "true",
  });

  useEffect(() => {
    if (ticketPackageForm.ticketPackage) {
      setFormState({
        comboPrice: ticketPackageForm.ticketPackage.comboPrice,
        price: ticketPackageForm.ticketPackage.price,
        code: ticketPackageForm.ticketPackage.code,
        name: ticketPackageForm.ticketPackage.name,
        status: ticketPackageForm.ticketPackage.status ? "true" : "false",
      });
      setApplicableDate(
        new Date(ticketPackageForm.ticketPackage.applicableDate)
      );
      setExpirationDate(
        new Date(ticketPackageForm.ticketPackage.expirationDate)
      );
    }
  }, [ticketPackageForm]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormState({
        ...formState,
        [name]: value === "true" ? true : false,
      });
      return;
    }
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div
      className={[
        styles.panel,
        ticketPackageForm.isShow ? styles.show : "",
      ].join(" ")}
    >
      <div className={styles.panelHeader}>
        <h3 className={styles.titleTop}>
          {ticketPackageForm.ticketPackage
            ? "C???p nh???t th??ng tin g??i v??"
            : "Th??m g??i v??"}
        </h3>
        <button onClick={() => dispatch(hideTicketPackageFormAction())}>
          <FaTimes size={18} />
        </button>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.formGroup}>
            <label>M?? g??i</label>
            <input
              type="text"
              placeholder="Nh???p m?? g??i"
              name="code"
              value={formState.code}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.formGroup}>
            <label>T??n g??i v??</label>
            <input
              type="text"
              placeholder="Nh???p t??n g??i v??"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.dateRow}>
        <div className={styles.date}>
          <p className={styles.title}>Ng??y ??p d???ng</p>
          <div className={styles.dateOutput}>
            <div>{applicableDate.toDateString()}</div>
            <button
              onClick={() => setShowApplicableDate((prevState) => !prevState)}
            >
              <AiOutlineCalendar size={24} color="#FF993C" />
            </button>
          </div>
          <div className={styles.calendar}>
            {showApplicableDate && (
              <Calendar
                onChange={(dateStr: Date) => {
                  setApplicableDate(dateStr);
                  setShowApplicableDate(false);
                }}
                value={applicableDate}
                defaultView="month"
                maxDate={expirationDate}
              />
            )}
          </div>
        </div>
        <div className={styles.date}>
          <p className={styles.title}>Ng??y h???t h???n</p>
          <div className={styles.dateOutput}>
            <div>{expirationDate.toDateString()}</div>
            <button
              onClick={() => setShowExpirationDate((prevState) => !prevState)}
            >
              <AiOutlineCalendar size={24} color="#FF993C" />
            </button>
          </div>
          <div className={styles.calendar}>
            {showExpirationDate && (
              <Calendar
                onChange={(dateStr: Date) => {
                  setExpirationDate(dateStr);
                  setShowExpirationDate(false);
                }}
                value={expirationDate}
                defaultView="month"
                minDate={applicableDate}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.rowFull}>
        <p className={styles.title}>Gi?? v?? ??p d???ng</p>
        <div className={styles.colFull}>
          <span>V?? l??? (vn??/v??) v???i gi??</span>
          <input
            type="number"
            placeholder="Gi?? v??"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
          <span>/ v??</span>
        </div>
        <div className={styles.colFull}>
          <span>Combo v?? v???i gi??</span>
          <input
            type="number"
            placeholder="Gi?? v??"
            name="comboPrice"
            value={formState.comboPrice}
            onChange={handleChange}
          />
          <span>/ 4 v??</span>
        </div>
      </div>
      <div className={styles.statusRow}>
        <p className={styles.title}>T??nh tr???ng</p>
        <div className={styles.statusOptions}>
          <select
            name="status"
            className={styles.select}
            value={formState.status}
            onChange={handleChange}
          >
            <option value="true">??ang ??p d???ng</option>
            <option value="false">T???t</option>
          </select>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <button
          onClick={() =>
            onSubmit({
              applicableDate,
              expirationDate,
              ...formState,
            })
          }
        >
          L??u
        </button>
      </div>
    </div>
  );
};

export default TicketPackageForm;
