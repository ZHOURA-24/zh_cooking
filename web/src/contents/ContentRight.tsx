import ContentRightView from "../components/views/ContentRight";
import { ItemsProps, ItemProps } from "../typings/item";

type PropsTypes = {
    right: ItemProps | null,
    setRight: any,
    data: ItemsProps,
    setData: any,
    count: number,
    setCount: any,
}

function ContentRight(props: PropsTypes) {
    const { right, setRight, setData, data, count, setCount } = props;
    return (
        <ContentRightView right={right} data={data} setRight={setRight} setData={setData} count={count} setCount={setCount} />
    );
}

export default ContentRight;