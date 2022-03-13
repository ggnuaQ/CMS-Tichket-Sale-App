import Logo from "../logo";
import { NavLink, Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineTicket } from 'react-icons/hi';
import { BsCardChecklist } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import styles from './sidebar.module.css';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Sidebar = () => {
  const { sidebar } = useSelector((state: RootState) => state.global);

  const activeSidebarLink = [styles.active, styles.sidebarLink].join(' ');
  const sidebarClasses = [styles.sidebar, sidebar.isShow ? styles.show : ''].join(' ');

  return (
    <div className={sidebarClasses}>
      <div>
        <NavLink to="/"
          className={styles.sidebarLink}>
          <Logo />
        </NavLink>
        <ul className={styles.sidebarLinks}>
          <NavLink to="/"
            className={({ isActive }) => isActive ? activeSidebarLink : styles.sidebarLink}>
            <AiFillHome color="#1E0D03" size={18} />
            <span>
              Trang chủ
            </span>
          </NavLink>
          <NavLink to="/tickets" className={({ isActive }) => isActive ? activeSidebarLink : styles.sidebarLink}>
            <HiOutlineTicket color="#1E0D03" size={18} /> <span>Quản lý vé</span>
          </NavLink>
          <NavLink to="/check" className={({ isActive }) => isActive ? activeSidebarLink : styles.sidebarLink}>
            <BsCardChecklist color="#1E0D03" size={18} />
            <span>Đối soát vé</span>
          </NavLink>
          <div>
            <NavLink to="/settings" className={({ isActive }) => isActive ? activeSidebarLink : styles.sidebarLink}>
              <FiSettings color="#1E0D03" size={18} /> <span>Cài đặt</span>
            </NavLink>
            <Link to="/settings" className={styles.indentLink}>
              Gói dịch vụ
            </Link>
          </div>
        </ul>
      </div>
      <div className={styles.sidebarBottom}>
        <p>
          Copyright &copy; 2021 Alta Software
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
