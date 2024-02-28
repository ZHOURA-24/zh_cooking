import ContentLeftView from "../components/views/ContentLeft";
import { ItemsProps, ItemProps } from "../typings/item";

type PropsTypes = {
    data: ItemsProps,
    clickHandle: (item: ItemProps) => void
}

function ContentLeft(props: PropsTypes) {
    const { data, clickHandle } = props;
    return (
        <ContentLeftView data={data} clickHandle={clickHandle} />
    );
}

export default ContentLeft;