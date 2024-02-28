export type ItemProps = {
    label?: string,
    name: string,
    count: string;
    image?: string;
    active?: boolean
    items?: ItemProps[]
};

export type ItemsProps = ItemProps[];

