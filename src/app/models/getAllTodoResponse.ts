export interface GetAllTodoResponse {
    id: number;
  userId: number;
  userName: string;
  todoName: string;
  todoDescription: string;
  isCompleted: boolean;
  createdDate: Date;
  updatedDate: Date | null;
}