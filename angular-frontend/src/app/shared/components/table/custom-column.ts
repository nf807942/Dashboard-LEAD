export interface CustomColumn {
    name: string;
    property: string;
    subproperty?: string;
    calculatedProperty?: any;
    type?: string;
    translated?: boolean;
    admin?: boolean;

    button?: boolean;
    buttons?: {
        buttonText?: string;
        buttonIcon?: string;
        buttonColor?: string;
        buttonAction?: (data: any) => any;
        admin?: boolean;
    } []
}
