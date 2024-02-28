import { useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import ContentLeft from "./ContentLeft";
import ContentRight from "./ContentRight";
import { debugData } from "../utils/debugData";
import { items } from "../utils/data";
import { ItemProps, ItemsProps } from "../typings/item";

debugData([
    {
        action: 'setItems',
        data: items
    }
]);

function MainContent() {
    const [data, setData] = useState<ItemsProps>([]);
    const [right, setRight] = useState<ItemProps | null>(null);
    const [count, setCount] = useState<number>(1);

    useNuiEvent('setItems', (data: any) => {
        setData(data);
    });

    const clickHandle = (item: ItemProps) => {
        setData(data.map((i: any) => {
            if (i.label === item.label) {
                return { ...i, active: true };
            }
            return { ...i, active: false };
        }));

        if (right !== null && right.label === item.label) {
            setData(data.map((i: any) => ({ ...i, active: false })));
            return setRight(null);
        }
        setCount(1);
        setRight(item);
    };

    return (
        <>
            <ContentLeft data={data} clickHandle={clickHandle} />
            <ContentRight right={right} data={data} setRight={setRight} setData={setData} count={count} setCount={setCount} />
        </>
    );

}

export default MainContent;