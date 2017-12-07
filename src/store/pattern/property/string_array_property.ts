import { Property } from '.';

export class StringArrayProperty extends Property {
	public constructor(id: string, name: string, required: boolean) {
		super(id, name, required);
	}

	// tslint:disable-next-line:no-any
	public coerceValue(value: any): any {
		// tslint:disable-next-line:no-any
		return this.coerceArrayValue(value, (element: any) => String(value));
	}

	public getType(): string {
		return 'string[]';
	}

	public toString(): string {
		return `StringArrayProperty(id="${this.getId()}", required="${this.isRequired()}")`;
	}
}