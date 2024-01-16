import { Account } from "./account";
import { Project } from "./project";
import { User } from "./user";

export interface ProjectAccount {
  id: number;
  account_id: number;
  project_id: number;
  disponible_amount: number;
  user_id: number;

  account: Account;
  project: Project;
  user: User;
}
