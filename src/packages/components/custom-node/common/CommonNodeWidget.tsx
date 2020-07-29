import * as React from 'react';
import { CommonNodeModel } from './CommonNodeIndex';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import '../custom-node.less';
import { getIconForPhaseType } from '../../nodeTypeDefine';

export interface CommonNodeWidgetProps {
    node: CommonNodeModel;
    engine: DiagramEngine;
}

export class CommonNodeWidget extends React.Component<CommonNodeWidgetProps> {
    render() {
       
        return (
            <div
                className={`common-node ${
                    this.props.node.isStart ? 'is_start' : ''
                } ${
                    this.props.node.isEnd ? 'is_end' : ''
                } ${
                    this.props.node.isSelected() ? 'is_selected' : ''
                }`}
                onContextMenu={this.props.node.onContextMenu}
                onClick={() => {
                    if (typeof this.props.node.onNodeClick === 'function'){
                        this.props.node.onNodeClick(this.props.node)
                    }
                }}
            >
                <div className="title">
                    { getIconForPhaseType(this.props.node.data.phaseType) }
                    <span style={{marginLeft: '5px'}}>
                    { 
                        this.props.node.isStart ? 'Start' : (
                            this.props.node.isEnd ? 'End' : (
                                this.props.node.data.title
                            )
                        )
                    }
                    </span>
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
