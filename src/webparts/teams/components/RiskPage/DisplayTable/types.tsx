export interface IDisplayTableProps {
    header: {
        items: string[];
    };
    rows: [{
        key: number;
        items: string[];
    }]
}