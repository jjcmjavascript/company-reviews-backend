export interface ReportedCompanyComentPrimitive {
  id: number;
  description: string;
  reportedCompanyId: number;
  image: string;
  userId: string;
}

export class ReportedCompanyComment {
  private attributes: ReportedCompanyComentPrimitive;

  constructor(readonly comment: ReportedCompanyComentPrimitive) {
    this.attributes = comment;
  }

  static create(
    comment: Partial<ReportedCompanyComentPrimitive>,
  ): ReportedCompanyComment {
    return new ReportedCompanyComment({
      id: comment.id,
      description: comment.description,
      reportedCompanyId: comment.reportedCompanyId,
      image: comment.image,
      userId: comment.userId,
    });
  }

  toPrimitive(): ReportedCompanyComentPrimitive {
    return this.attributes;
  }

  static fromArray(
    comments: Array<ReportedCompanyComentPrimitive>,
  ): Array<ReportedCompanyComment> {
    return comments.map((comment) => new ReportedCompanyComment(comment));
  }

  get values() {
    return this.attributes;
  }
}
