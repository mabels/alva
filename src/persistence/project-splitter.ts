import * as path from 'path';
import { SavedProject, SavedProject } from '../types';

export interface ContainerWriter {
	begin(): Promise<void>;
	addFile(name: string, buffer: Buffer): Promise<void>;
	end(): Promise<void>;
}

export interface ContainerReader {
	begin(): Promise<void>;
	subscribe(cb: (name: string, buffer: Buffer) => Promise<void>): Promise<void>;
	end(): Promise<void>;
}

export enum StoreClassNames {
	Project = 'Project',
	Action = 'Action',
	Content = 'Content',
	Element = 'Element',
	Page = 'Page',
	PatternLibrary = 'PatternLibrary'
}

export async function ProjectWriter(
	prj: SavedProject,
	containerWriter: ContainerWriter
): Promise<> {
	await containerWriter.begin();
	await containerWriter.addFile(
		`${prj.id}/${StoreClassNames.Project}.json`,
		Buffer.from(
			JSON.stringify({
				id: prj.id,
				name: prj.name,
				userStore: prj.userStore
			}),
			'utf-8'
		)
	);
	[
		[StoreClassNames.Action, prj.elementActions],
		[StoreClassNames.Action, prj.elementContents],
		[StoreClassNames.Action, prj.elements],
		[StoreClassNames.Action, prj.pages],
		[StoreClassNames.Action, prj.patternLibraries]
	].forEach(arr =>
		arr.forEach(async element => {
			await containerWriter.addFile(
				path.join(prj.id, element.constructor.name, `${element.id}.json`),
				Buffer.from(JSON.stringify(element), 'utf-8')
			);
		})
	);
}

export async function ProjectLoader(containerReader: ContainerReader): Promise<SavedProject[]> {
	await containerReader.begin();
	// tslint:disable-next-line:no-any
	const prjs: Map<string, Map<string, any[]>> = new Map<string, Map<string, any[]>>();
	await containerReader.subscribe(async (name, buffer) => {
		const [prj_id, clazzName] = name.split(path.sep);
		let prj = prjs.get(prj_id);
		if (!prj) {
			// tslint:disable-next-line:no-any
			prj = new Map<string, any[]>();
			prjs.set(prj_id, prj);
		}
		let ids = prj.get(clazzName);
		if (!ids) {
			// tslint:disable-next-line:no-any
			ids = [];
			prj.set(clazzName, ids);
		}
		ids.push(buffer);
	});
	await containerReader.end();
	const sprjs: SavedProject[] = [];
	for (const { key, val } of prjs.entries()) {
		const prj = val.get('SavedProject');
		if (prj) {
		}
	}
	return sprjs;
}
