import {
  AiOutlineMail,
  AiOutlineMenuUnfold,
  AiOutlineSearch,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { hideSidebarAction, showSidebarAction } from "../../store/actions";

import styles from "./topMenu.module.css";

const TopMenu = () => {
  const { sidebar } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();

  return (
    <div className={styles.topMenu}>
      <form className={styles.form}>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={24} />
        </button>
      </form>
      <div className={styles.rightMenu}>
        <button className={styles.rightBtn}>
          <AiOutlineMail size={24} />
        </button>
        <button className={styles.rightBtn}>
          <IoMdNotificationsOutline size={24} />
        </button>
        <div className={styles.avatar}>
          <img
            src="https://images.pexels.com/photos/6203797/pexels-photo-6203797.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt="avatar"
          />
        </div>
        <button
          className={[styles.rightBtn, styles.toggleSidebarBtn].join(" ")}
          onClick={() =>
            sidebar.isShow
              ? dispatch(hideSidebarAction())
              : dispatch(showSidebarAction())
          }
        >
          {sidebar.isShow ? (
            <AiOutlineMenuFold size={24} />
          ) : (
            <AiOutlineMenuUnfold size={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopMenu;
