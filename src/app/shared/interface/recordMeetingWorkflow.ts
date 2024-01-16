import { BaseModel } from "./baseModel";
import { RecordMeeting } from "./recordMeeting";
import { User } from "./user";

export interface RecordMeetingWorkflow extends BaseModel {

    user_id: number;
    record_meeting_id: number;
    status_workflow: RequirementWokflowStatusEnum;
    comments: string;

    user?: User;
    record_meeting?: RecordMeeting;
}

export enum RequirementWokflowStatusEnum {
    SOLICITANDO = 'solicitando',
    APROVANDO = 'aprovando',
    PROMOVIDO = 'promovido',
}
