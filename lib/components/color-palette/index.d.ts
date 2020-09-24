import * as React from 'react';
import { IColorCard } from './color-card';
export interface IColorPaletteProps {
    lineCount?: number;
    blockStyle?: React.CSSProperties;
    items: IColorCard[];
    isShowAll?: boolean;
    onClick?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
    onMouseMove?: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => void;
}
export interface IColorPaletteState {
    activeIndex: string;
    colorItems: IColorCard[];
    activeItemId?: string;
}
export interface ColorNav {
    color: string;
    count: number;
    scrollInfo: {
        pageIndex: number;
        scrollHeigth: number;
    };
}
export declare class ColorPalette extends React.Component<IColorPaletteProps, IColorPaletteState> {
    static defaultProps: {
        lineCount: number;
        isShowAll: boolean;
    };
    noCheck: boolean;
    itemHeigth: number;
    itemLineCount: number;
    maxBlocks: number;
    currentPage: number;
    fillItemCount: number;
    navBlocks: Map<string, ColorNav>;
    private boxRef;
    constructor(props: IColorPaletteProps);
    get sourceItems(): IColorCard[];
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IColorPaletteProps): void;
    componentWillUnmount(): void;
    generateData: () => void;
    checkScrollTo(element: HTMLDivElement | undefined, options: ScrollToOptions): void;
    initData(props: IColorPaletteProps): void;
    getPageItems(startPage: number, endPage?: number): {
        index: number;
        items: IColorCard[];
    };
    getScrollInfoByIndex(index: number): {
        pageIndex: number;
        scrollHeigth: number;
    };
    handleCardScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    checkNavigation(): void;
    getScrollBars(): JSX.Element[];
    handleActiveChange(key: string): void;
    handleItemMouseDown: (item: IColorCard, e?: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => void;
    render(): JSX.Element;
}
