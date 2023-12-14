export enum PlanStatus {
  Archived = 0,
  Active = 1,
}
export class PlanDto {
  id: number;
  name: string;
  description: string;
  status: PlanStatus;
}
