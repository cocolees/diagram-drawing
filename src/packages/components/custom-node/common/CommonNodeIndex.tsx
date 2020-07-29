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
import { CommonNodeWidget } from './CommonNodeWidget';
import { RightAngleModel } from '../../custom-link/right-angle/RightAngleModel';
import _ from 'lodash';

export class CommonPortModel extends PortModel {
    constructor(alignment: PortModelAlignment) {
        super({
            type: 'common',
            name: alignment,
            alignment: alignment
        });
    }

    createLinkModel(): LinkModel {
        return new RightAngleModel();
    }

    // createLinkModel(): LinkModel {
    //     return new RightAngleLinkModel();
    // }
}

export interface CommonNodeModelGenerics {
    PORT: CommonPortModel;
}

export class CommonNodeModel extends NodeModel<NodeModelGenerics & CommonNodeModelGenerics> {
    data: any;
    isStart: boolean;
    isEnd: boolean;

    constructor( data = { 
        title: 'Untitled', 
        phaseType: '', 
        classId: 0,   //assign class id
        classType: '',
        parameters: [] as any
    }, isStart = false, isEnd = false) {
        super({
            type: 'common'
        });
        this.addPort(new CommonPortModel(PortModelAlignment.TOP));
        this.addPort(new CommonPortModel(PortModelAlignment.BOTTOM));
        this.data = data;
        this.isStart = isStart;
        this.isEnd = isEnd;
    }

    serialize() {
        const data = _.merge(super.serialize(), {
            data: this.data,
            isStart: this.isStart,
            isEnd: this.isEnd,
            onContextMenu: (e: any) => this.onContextMenu(e),
            onNodeClick: (e: any) => this.onNodeClick(e),
        });
        return data;
    }

    deserialize(event: any) {
        super.deserialize(event);
        this.data = event.data.data;
        this.isStart = event.data.isStart;
        this.isEnd = event.data.isEnd;
        this.onContextMenu = event.data.onContextMenu;
        this.onNodeClick = event.data.onNodeClick;
    }

    onContextMenu = (e: any) => {
        // this.onContext(e);
    }
    onNodeClick = (e: any) => {
        // console.log('e2222', e);
    }
}

export class CommonNodeFactory extends AbstractReactFactory<CommonNodeModel, DiagramEngine> {
    constructor() {
        super('common');
    }
    generateReactWidget(event: any): JSX.Element {
        return <CommonNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel() {
        return new CommonNodeModel();
    }
}
