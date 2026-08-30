import styles from "./LoadingMessage.module.css";

export default function LoadingMessage({ children }) {
  return (
    <p className={styles.loadingMessage} role="status">
      {children}
    </p>
  );
}
