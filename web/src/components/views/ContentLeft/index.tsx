import styles from './ContentLeftView.module.scss';
import Card from '../../ui/Card';
import { ItemsProps, ItemProps } from "../../../typings/item";

type PropsTypes = {
    data: ItemsProps,
    clickHandle: (item: ItemProps) => void
}

function ContentLeftView(props: PropsTypes) {
    const { data, clickHandle } = props;

    return (
        <div className={styles.ContentLeftView}>
            {data.map((item: ItemProps, index: number) => {
                return <Card key={index} title={item.label || item.name} image={item.image || item.name} onClick={() => clickHandle(item)} active={item.active} />
            })}
        </div>
    );
}

export default ContentLeftView;