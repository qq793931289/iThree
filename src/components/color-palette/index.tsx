import * as React from 'react';
import { ColorCard, IColorCard } from './color-card';

export interface IColorPaletteProps {
    lineCount?: number; // 一行多少个元素 ...默认是6个
    blockStyle?: React.CSSProperties; // 对于显示颜色块的样式扩展（用于设置高度）
    items: IColorCard[]; // 色块数组
    isShowAll?: boolean; // 显示全部，不显示分组;默认分组显示

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

export class ColorPalette extends React.Component<IColorPaletteProps, IColorPaletteState> {
    public static defaultProps = {
        lineCount: 7,
        isShowAll: false,
    };
    public noCheck: boolean = false;
    // public scrollNode: HTMLDivElement | undefined; // 滚动node
    public itemHeigth: number = 0; // 单元素高底
    public itemLineCount: number = 0; // 总共多少行
    public maxBlocks: number = 0; // 一页多少行
    public currentPage: number = 0; // 当前第几页
    public fillItemCount: number = 0; // 填充元素个数
    public navBlocks = new Map<string, ColorNav>();


    private boxRef: React.RefObject<HTMLDivElement>;
    constructor(props: IColorPaletteProps) {
        super(props);
        this.state = {
            activeIndex: '',
            colorItems: [],
        };
        this.boxRef = React.createRef();
    }

    get sourceItems(): IColorCard[] {
        const fillItems = new Array(this.fillItemCount).fill({
            id: '',
            name: '',
            color: 'transparent',
            colorIndex: '',
        });
        return [...this.props.items, ...fillItems];
    }

    public componentDidMount() {
        this.initData(this.props);
        window.addEventListener('resize', this.generateData);
    }

    public componentWillReceiveProps(nextProps: IColorPaletteProps) {
        this.initData(nextProps);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.generateData);
    }

    public generateData = () => {
        this.initData(this.props);
    }


    public checkScrollTo(element: HTMLDivElement | undefined, options: ScrollToOptions) {
        if (element) {
            if (element.scrollTo) {
                element.scrollTo(options);
            } else if (element.scroll) {
                element.scroll(options);
            } else if (element.scrollBy) {
                const { top, left } = options;
                const scrollOpt: ScrollToOptions = {};
                if (top !== undefined) {
                    scrollOpt.top = top - element.scrollTop;
                }
                if (left !== undefined) {
                    scrollOpt.left = left - element.scrollLeft;
                }
                element.scrollBy(scrollOpt);
            }
        }

    }

    public initData(props: IColorPaletteProps) {
        if (this.props.isShowAll) {
            this.setState({
                colorItems: this.props.items,
            });
            return;
        }
        if (this.boxRef.current) {
            const { clientHeight, clientWidth } = this.boxRef.current;
            const { items } = props;
            const lineCount = this.props.lineCount || 0;


            // 单个元素高度
            this.itemHeigth = ((clientWidth - 38) / lineCount); // padding-left + padding-right = 38
            // 总共多少行
            this.itemLineCount = Math.floor(items.length / lineCount) + (items.length % lineCount ? 1 : 0);
            // 一页最多有多少个颜色块
            this.maxBlocks = Math.ceil(clientHeight / this.itemHeigth) * lineCount;

            // 导航
            const tempNav = new Map<string, ColorNav>();
            items.forEach((item, index) => {
                const navInfo = tempNav.get(item.colorIndex) || {
                    color: item.colorIndex,
                    count: 0,
                    scrollInfo: this.getScrollInfoByIndex(index),
                };
                tempNav.set(item.colorIndex, navInfo);
                navInfo.count++;
            });
            this.navBlocks = tempNav;

            const lastNav = tempNav.get(items[items.length - 1].colorIndex)!;
            const firstNav = tempNav.get(items[0].colorIndex)!;
            // 填充空白的个数计算
            if (this.maxBlocks > lastNav.count) {
                this.fillItemCount = this.maxBlocks - lastNav.count + 1;
            }

            this.currentPage = 1;
            this.setState({
                colorItems: this.getPageItems(1, 2).items,
                activeIndex: firstNav.color,
            }, () => {
                if (this.boxRef.current) {
                    this.checkScrollTo(this.boxRef.current, { top: 1 });
                }
            });
        }

    }

    public getPageItems(startPage: number, endPage?: number) {
        let endNum = startPage * this.maxBlocks;
        const startNum = (startPage - 1) * this.maxBlocks;
        if (endPage && endPage > startPage) {
            endNum = endPage * this.maxBlocks;
        }
        return {
            index: startPage,
            items: this.sourceItems.slice(startNum, endNum),
        };
    }

    public getScrollInfoByIndex(index: number) {
        const lineCount = this.props.lineCount || 0;
        // 第几页---- 页码从1开始
        const pageNum = Math.floor(index / this.maxBlocks) + 1;
        // 偏移高度 
        const offsetTop = Math.floor((index % this.maxBlocks) / lineCount) * this.itemHeigth;
        return {
            pageIndex: pageNum,
            scrollHeigth: offsetTop,
        };
    }

    public handleCardScroll = (e: React.UIEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (this.props.isShowAll) { return; }

        if (this.boxRef.current) {
            const { scrollTop, clientHeight } = this.boxRef.current;
            const node = this.boxRef.current;
            if (scrollTop >= clientHeight) {
                this.currentPage++;
                this.setState({
                    colorItems: this.getPageItems(this.currentPage, this.currentPage + 1).items,
                }, () => {
                    this.checkScrollTo(node, { top: 1 });
                    this.checkNavigation();
                });
            } else if (scrollTop <= 0 && this.currentPage !== 1) {
                this.currentPage--;
                this.setState({
                    colorItems: this.getPageItems(this.currentPage, this.currentPage + 1).items,
                }, () => {
                    this.checkScrollTo(node, { top: clientHeight - 1 });
                    this.checkNavigation();
                });
            } else {
                this.checkNavigation();
            }
        }
    }
    // 检查Nav导航
    public checkNavigation() {
        if (this.noCheck) {
            return;
        }

        const navs = this.navBlocks.values();
        let scrollTop = 0;
        if (this.boxRef.current) {
            scrollTop = this.boxRef.current.scrollTop;
        }
        let tempNow, tempNext;
        tempNow = navs.next();
        do {
            tempNext = navs.next();
            const nowInfo = tempNow.value.scrollInfo;
            if (tempNext.value) {
                const nextInfo = tempNext.value.scrollInfo;
                const conditionOne = nowInfo.pageIndex < this.currentPage && nextInfo.pageIndex > this.currentPage;
                let conditionTwo, conditionThree;
                if (!conditionOne) {
                    conditionTwo = nowInfo.pageIndex === this.currentPage && nowInfo.scrollHeigth <= scrollTop;
                    if (nextInfo.pageIndex === this.currentPage && nextInfo.scrollHeigth <= scrollTop) {
                        conditionTwo = false;
                    }
                }
                if (!conditionTwo) {
                    conditionThree = nextInfo.pageIndex === this.currentPage && nextInfo.scrollHeigth > scrollTop;
                }
                if (conditionOne || conditionTwo || conditionThree) {
                    this.setState({
                        activeIndex: tempNow.value.color,
                    });
                    break;
                }
            } else {
                const conditionOne = nowInfo.pageIndex < this.currentPage;
                let conditionTwo;
                if (!conditionOne) {
                    conditionTwo = nowInfo.pageIndex === this.currentPage && nowInfo.scrollHeigth <= scrollTop;
                }
                if (conditionOne || conditionTwo) {
                    this.setState({
                        activeIndex: tempNow.value.color,
                    });
                    break;
                }
            }

            tempNow = tempNext;
        } while (!tempNext.done);
    }

    public getScrollBars() {
        return [...this.navBlocks.values()].map(item => {
            const style = {
                backgroundColor: item.color,
                height: `${100 / this.navBlocks.size}%`,
            };
            return <div key={item.color} className={item.color === this.state.activeIndex ? 'active' : ''} style={style} onClick={() => {
                this.handleActiveChange(item.color);
            }}></div>;
        });
    }

    public handleActiveChange(key: string) {
        if (!this.boxRef.current) {
            return;
        }
        const info = this.navBlocks.get(key)!.scrollInfo;
        this.currentPage = info.pageIndex;
        this.setState({
            activeIndex: key,
            colorItems: this.getPageItems(this.currentPage, this.currentPage + 1).items,
        }, () => {
            const node = this.boxRef.current!;
            //设最小偏移量 + 1，防止无法向上滚动
            this.checkScrollTo(node, { top: info.scrollHeigth + 1 });

            this.noCheck = true;
            setTimeout(() => {
                this.noCheck = false;
            }, 200);
        });
    }

    public handleItemMouseDown = (item: IColorCard, e?: React.MouseEvent<HTMLDivElement>) => {
        this.setState({
            activeItemId: item.id,
        });
        if (this.props.onMouseDown) {
            this.props.onMouseDown(item, e);
        }
    }

    public render() {
        const lineCount = this.props.lineCount || 0;

        const list = this.state.colorItems.map((item, index) => {
            return <ColorCard key={index} item={item} active={this.state.activeItemId === item.id} lineCount={lineCount} onClick={this.props.onClick} onMouseDown={this.handleItemMouseDown} onMouseMove={this.props.onMouseMove} onMouseUp={this.props.onMouseUp} />;
        });

        return <div className='color-palette'>
            <div className='outer-container'>
                <div className={`scrollbar ${this.props.isShowAll ? 'hide' : ''}`}>
                    {this.getScrollBars()}
                </div>
                <div className='card-list' ref={this.boxRef} onScroll={this.handleCardScroll} >
                    {list}
                </div>
            </div>
        </div>;
    }
}
