import * as React from 'react';
import { RightAngleWidget } from './RightAngleWidgetRA';
import { DefaultLinkFactory } from '@projectstorm/react-diagrams-defaults';
import { RightAngleModel } from './RightAngleModel';

/**
 * @author Daniel Lazar
 */
export class RightAngleFactory extends DefaultLinkFactory<RightAngleModel> {
	static NAME = 'rightAngle';

	constructor() {
		super(RightAngleFactory.NAME);
	}

	generateModel(event: any): RightAngleModel {
		return new RightAngleModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <RightAngleWidget diagramEngine={this.engine} link={event.model} factory={this} />;
	}
}
