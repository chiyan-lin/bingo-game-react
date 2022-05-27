import React from 'react';
import styles from './index.module.scss';

export type ComponentProps = {};

function Component(props: ComponentProps) {
  console.log(props);
  return <div className={styles.contianer}></div>;
}

export default Component;
