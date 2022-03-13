/** @format */

import PropTypes from "prop-types";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styles from "./paginator.module.css";

const Paginator = (props: {
  maxPage: number,
  curPage: number,
  setCurPage: Function,
  isLoading: boolean,
  scrollAfterClicking: boolean,
}) => {

  const { curPage, isLoading, maxPage, scrollAfterClicking, setCurPage } = props;

  if (isLoading) {
    return null;
  }
  if (!maxPage || maxPage <= 1) {
    return null;
  }

  return (
    <div className={styles.paginatorWrap}>
      <ul
        className={styles.paginator}
        style={{
          width: "fit-content !important",
        }}
      >
        <li
          className={[styles.paginator__item, curPage === 0 ? styles.divDisable : ""].join(" ")}
        >
          <button
            onClick={() => {
              setCurPage((prevState: number) => prevState - 1);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <BiChevronLeft size={36} color="#ffb800" />
          </button>
        </li>
        {Array(maxPage)
          .fill(1)
          .map((_, index) => (
            <li
              key={index}
              className={[styles.paginator__item, curPage === index ? styles.paginator__itemActive : ""].join(" ")}
            >
              <button
                onClick={() => {
                  setCurPage(index);
                  if (scrollAfterClicking) {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {index + 1}
              </button>
            </li>
          ))}
        <li
          className={[styles.paginator__item, curPage === maxPage - 1 ? styles.divDisable : ""].join(" ")}
        >
          <button
            onClick={() => {
              setCurPage((prevState: number) => prevState + 1);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <BiChevronRight size={36} color="#ffb800" />
          </button>
        </li>
      </ul>
    </div >
  );
};

Paginator.propTypes = {
  maxPage: PropTypes.number,
  curPage: PropTypes.number,
  setCurPage: PropTypes.func,
  isLoading: PropTypes.bool,
  scrollAfterClicking: PropTypes.bool,
};

export default Paginator;
