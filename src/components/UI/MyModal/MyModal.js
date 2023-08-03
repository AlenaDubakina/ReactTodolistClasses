import React from 'react';
import styles from './MyModal.module.css';

const MyModal = ({ children, visible, onVisibleModal }) => {
  const rootClasses = [styles.myModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => onVisibleModal()}>
      <div
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default MyModal;
