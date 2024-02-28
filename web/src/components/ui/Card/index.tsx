import styles from './Card.module.scss';
import { GetImage } from '../../../utils/image';

function Card(props: any) {
    const { onClick, image, title, active } = props;
    return (
        <div className={styles.card + (active ? ' ' + styles.card__active : '')} onClick={onClick}>
            <img className={styles.card__image} src={GetImage(image)} alt="" />
            <div className={styles.card__content + (active ? ' ' + styles.card__content__active : '')}>
                <h4 className={styles.card__content__title}>{title}</h4>
            </div>
        </div>
    );
}

export default Card;