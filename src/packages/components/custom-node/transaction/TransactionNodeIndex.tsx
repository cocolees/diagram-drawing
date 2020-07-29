import { 
    PortModel, 
    PortModelAlignment, 
    NodeModelGenerics, 
    NodeModel, 
    LinkModel,
    // RightAngleLinkModel
} from '@projectstorm/react-diagrams';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import * as React from 'react';
import { TransactionNodeWidget } from './TransactionNodeWidget';
import { RightAngleModel } from '../../custom-link/right-angle/RightAngleModel';
import _ from 'lodash';

export class TransactionPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: 'transaction',
            name: alignment,
            alignment: alignment
        });
    }

    createLinkModel(): LinkModel {
        return new RightAngleModel();
    }
}

export interface TransactionNodeModelGenerics {
    PORT: TransactionPortModel;
}

export class TransactionNodeModel extends NodeModel<NodeModelGenerics & TransactionNodeModelGenerics> {
    data: any;

    constructor(
        data = {
            title: 'transaction'
        }
    ) {
        super({
            type: 'transaction'
        });
        this.addPort(new TransactionPortModel(PortModelAlignment.TOP));
        this.addPort(new TransactionPortModel(PortModelAlignment.BOTTOM));
        this.data = data;
    }

    serialize() {
        const data = _.merge(super.serialize(), {
            data: this.data,
            onNodeClick: (e: any) => this.onNodeClick(e),
        });
        return data;
    }

    deserialize(event: any) {
        super.deserialize(event);
        this.data = event.data.data;
        this.onNodeClick = event.data.onNodeClick;
    }

    onNodeClick = (e: any) => {}
}

export class TransactionNodeFactory extends AbstractReactFactory<TransactionNodeModel, DiagramEngine> {
    constructor() {
        super('transaction');
    }
    generateReactWidget(event: any): JSX.Element {
        return <TransactionNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel() {
        return new TransactionNodeModel();
    }
}
