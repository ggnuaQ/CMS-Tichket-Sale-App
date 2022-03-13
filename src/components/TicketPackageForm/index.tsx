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
            ? "Cập nhật thông tin gói vé"
            : "Thêm gói vé"}
        </h3>
        <button onClick={() => dispatch(hideTicketPackageFormAction())}>
          <FaTimes size={18} />
        </button>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.formGroup}>
            <label>Mã gói</label>
            <input
              type="text"
              placeholder="Nhập mã gói"
              name="code"
              value={formState.code}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.formGroup}>
            <label>Tên gói vé</label>
            <input
              type="text"
              placeholder="Nhập tên gói vé"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.dateRow}>
        <div className={styles.date}>
          <p className={styles.title}>Ngày áp dụng</p>
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
          <p className={styles.title}>Ngày hết hạn</p>
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
        <p className={styles.title}>Giá vé áp dụng</p>
        <div className={styles.colFull}>
          <span>Vé lẻ (vnđ/vé) với giá</span>
          <input
            type="number"
            placeholder="Giá vé"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
          <span>/ vé</span>
        </div>
        <div className={styles.colFull}>
          <span>Combo vé với giá</span>
          <input
            type="number"
            placeholder="Giá vé"
            name="comboPrice"
            value={formState.comboPrice}
            onChange={handleChange}
          />
          <span>/ 4 vé</span>
        </div>
      </div>
      <div className={styles.statusRow}>
        <p className={styles.title}>Tình trạng</p>
        <div className={styles.statusOptions}>
          <select
            name="status"
            className={styles.select}
            value={formState.status}
            onChange={handleChange}
          >
            <option value="true">Đang áp dụng</option>
            <option value="false">Tắt</option>
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
          Lưu
        </button>
      </div>
    </div>
  );
};

export default TicketPackageForm;
