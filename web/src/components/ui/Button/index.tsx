import styles from './Button.module.scss';

function Button(props: any) {
    const { onClick, children } = props;
    return (
        <div className={styles.button} onClick={onClick}>
            <div className={styles.button__text}>{children}</div>
        </div>
    );
}

export default Button;