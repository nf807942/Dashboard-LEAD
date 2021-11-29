export interface CustomColumn {
    name: string;
    property: string;

    button?: boolean;
    buttonText?: string;
    buttonIcon?: string;
    buttonColor?: string;
    buttonAction?: (data: any) => any;
}
