export interface CustomColumn {
    name: string;
    property: string;
    subproperty?: string;
    calculatedProperty?: any;

    button?: boolean;
    buttonText?: string;
    buttonIcon?: string;
    buttonColor?: string;
    buttonAction?: (data: any) => any;
}
