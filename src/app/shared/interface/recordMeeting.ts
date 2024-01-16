import { BaseModel } from "./baseModel";
import { CostCenterType } from "./costCenterType";
import { RecordMeetingWorkflow } from "./recordMeetingWorkflow";
import { RequirementWorkflow } from "./requirementWorkflow";
import { User } from "./user";

export interface RecordMeeting extends BaseModel {

    title: string;
    cost_center_type_id: number;
    president_id: number;
    secretary_id: number;
    date: string;
    attached_file: string;
    description: string;
    participants: string[];

    president?: User;
    secretary?: User;
    cost_center_type?: CostCenterType;
    last_record_meeting_workflow?: RecordMeetingWorkflow;
}
