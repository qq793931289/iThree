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

export class ColorCard extends React.Component<IColorCardProps, any> {

    public handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (this.props.item.id) {
            if (this.props.onClick) {
                this.props.onClick(this.props.item, e);
            }
        }
    }
    public handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (this.props.item.id) {
            if (this.props.onMouseDown) {
                this.props.onMouseDown(this.props.item, e);
            }
        }
    }
    public handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (this.props.item.id) {
            if (this.props.onMouseUp) {
                this.props.onMouseUp(this.props.item, e);
            }
        }
    }
    public handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (this.props.item.id) {
            if (this.props.onMouseMove) {
                this.props.onMouseMove(this.props.item, e);
            }
        }
    }

    public render() {
        const { item, lineCount } = this.props;
        const cardStyle = {
            width: `calc(100% / ${lineCount} - 3px)`,
        };
        return <div
            className={`color-card ${!item.id ? 'empty' : ''}`}
            style={cardStyle}
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
        >
            <div className={this.props.active ? 'active' : ''} style={{ backgroundColor: item.color }}>
                <p className='title'>{item.name}</p>
            </div>
        </div>;
    }
}