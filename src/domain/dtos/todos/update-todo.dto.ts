export class UpdateTodoDto {
  private constructor(
    public readonly text?: string,
    public readonly completedAt?: Date,
  ) { }

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = new Date(this.completedAt);
    return returnObj;
  }

  static create(props: { [key: string]: any }): [(string | undefined)?, (UpdateTodoDto | undefined)?] {
    const { text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        return ["completedAt must be a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(text, newCompletedAt)];
  }
}