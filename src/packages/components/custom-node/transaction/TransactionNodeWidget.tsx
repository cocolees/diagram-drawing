import * as React from 'react';
import { TransactionNodeModel } from './TransactionNodeIndex';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import '../custom-node.less';

export interface TransactionNodeWidgetProps {
    node: TransactionNodeModel;
    engine: DiagramEngine;
}

export class TransactionNodeWidget extends React.Component<TransactionNodeWidgetProps> {
    render() {
        return (
            <div
                className="transaction-node"
                onClick={() => {
                    if (typeof this.props.node.onNodeClick === 'function'){
                        this.props.node.onNodeClick(this.props.node)
                    }
                }}
            >
                <div className="cross">
                    <div className="top-center"></div>
                    <div className="bottom-center"></div>
                    <div className="left-center"></div>
                    <div className="right-center"></div>
                </div>
                <PortWidget
                    className="port-top"
                    port={this.props.node.getPort(PortModelAlignment.TOP)}
                    engine={this.props.engine}
                >
                    <div className="port-node"></div>
                </PortWidget>
                <PortWidget
                    className="port-bottom"
                    port={this.props.node.getPort(PortModelAlignment.BOTTOM)}
                    engine={this.props.engine}
                >
                    <div className="port-node"></div>
                </PortWidget>
            </div>
        );
    }
}
