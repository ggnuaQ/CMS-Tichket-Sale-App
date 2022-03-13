/** @format */

import loaderImg from '../../assets/images/loader.gif'
import styles from './loader.module.css'

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src={loaderImg} alt="loader-placeholder" />
    </div>
  )
}

export default Loader
