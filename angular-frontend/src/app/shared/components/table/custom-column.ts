export interface CustomColumn {
    name: string;
    property: string;
    subproperty?: string;
    calculatedProperty?: any;

    button?: boolean;
    buttons?: {
        buttonText?: string;
        buttonIcon?: string;
        buttonColor?: string;
        buttonAction?: (data: any) => any
    } []
}
