import css from './Container.module.css';
import clsx from 'clsx';

export default function Container({ children, className }) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}
