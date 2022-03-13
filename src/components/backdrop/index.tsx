import ReactDOM from "react-dom";
import styles from "./index.module.css";

const Backdrop = (props: { open: boolean; onClick: Function }) => {
  const { open, onClick } = props;
  // eslint-disable-next-line no-undef
  const backdropDomNode = document.getElementById("backdrop") as HTMLElement;

  return ReactDOM.createPortal(
    <div
      className={[styles.c__backdrop, open ? styles.show : ""].join(" ")}
      onClick={() => onClick()}
    />,
    backdropDomNode
  );
};

export default Backdrop;
