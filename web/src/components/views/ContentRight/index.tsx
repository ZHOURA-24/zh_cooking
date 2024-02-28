import styles from './ContentRightView.module.scss';
import Button from '../../ui/Button';
import { fetchNui } from '../../../utils/fetchNui';
import { IoIosAddCircle } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { GiCampCookingPot } from "react-icons/gi";
import { ItemProps, ItemsProps } from '../../../typings/item';
import { GetImage } from '../../../utils/image';

type PropsTypes = {
    right: ItemProps | null,
    setRight: any,
    data: ItemsProps,
    setData: any,
    count: number,
    setCount: any
}


function ContentRightView(props: PropsTypes) {
    const { right, data, setRight, setData, count, setCount } = props;

    return (
        <div className={`${styles.ContentRightView} ${right ? styles.ContentRightView__active : ''}`}>
            {right && (
                <>
                    <h3>{right.label || right.name} [{count}]</h3>
                    {right.items?.map((item: any, index: number) => (
                        <div key={index} className={styles.ContentRightView__item}>
                            <img src={GetImage(item.image || item.name)} className={styles.ContentRightView__item__image} />
                            <p className={styles.ContentRightView__item__text}>: X{item.count * count}</p>
                        </div>
                    ))}
                    <div className={styles.ContentRightView__actions}>
                        <Button onClick={() => {
                            setRight(null);
                            return setData(data.map((i: any) => ({ ...i, active: false })));
                        }} >
                            <IoCloseCircleSharp size={32} />
                        </Button>
                        <Button onClick={() => count < 10 && setCount(count + 1)}  >
                            <IoIosAddCircle size={32} />
                        </Button>
                        <Button onClick={() => fetchNui('cook', { item: right, count: count })} >
                            <GiCampCookingPot size={32} />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ContentRightView;