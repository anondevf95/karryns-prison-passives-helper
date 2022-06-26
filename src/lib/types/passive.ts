import type Skill from './skill';

export default interface Passive extends Skill {
	stypeId: 7;
}

export interface PassiveWithSaveData extends Passive {
	obtained: boolean;
	obtainedOn?: number;
}
