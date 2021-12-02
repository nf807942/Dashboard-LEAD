export interface CustomColumn {
    name: string;
    property: string;
    subproperty?: string;

    button?: boolean;
    buttonText?: string;
    buttonIcon?: string;
    buttonColor?: string;
    buttonAction?: (data: any) => any;
}
