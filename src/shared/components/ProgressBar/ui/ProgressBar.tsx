import styles from "./ProgressBar.module.scss";

export const ProgressBar = ({ percentage }: any) => {
  const getColor = () => {
    if (percentage <= 50) {
      return "red";
    } else if (percentage <= 75) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{ width: `${percentage}%`, backgroundColor: getColor() }}
      ><div className={styles.progressText}>{percentage}%</div></div>
    
    </div>
  );
};
