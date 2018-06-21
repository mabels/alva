import { PropertyItemEnumSelect, PropertyItemEnumSelectValues } from './index';
import * as React from 'react';
import DemoContainer from '../demo-container';

export interface EnumItemDemoState {
	selectedItem: string;
	values: PropertyItemEnumSelectValues[];
}

export class BooleanItemDemo extends React.Component<{}, EnumItemDemoState> {
	public constructor(props: {}) {
		super(props);

		const values = [
			{ id: 'id1', name: 'Medium' },
			{ id: 'id2', name: 'Rare' },
			{ id: 'id3', name: 'Solid Shoe' }
		];

		this.state = {
			values,
			selectedItem: values[0].name
		};
	}

	public render(): JSX.Element {
		return (
			<DemoContainer title="Enum Item">
				<PropertyItemEnumSelect label="Label" values={this.state.values} />
				<PropertyItemEnumSelect
					label="Label"
					values={this.state.values}
					selectedValue={this.state.selectedItem}
					required
				/>
			</DemoContainer>
		);
	}
}

export default BooleanItemDemo;
