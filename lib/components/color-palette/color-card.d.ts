import * as React from 'react';
export interface IColorCard {
    id: string;
    name: string;
    color: string;
    colorIndex: string;
}
export interface IColorCardProps {
    item: IColorCard;
    lineCount: number;
    active?: boolean;
    onClick?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
}
export declare class ColorCard extends React.Component<IColorCardProps, any> {
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    render(): JSX.Element;
}
