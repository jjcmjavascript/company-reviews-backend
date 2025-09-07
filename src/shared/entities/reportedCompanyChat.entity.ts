import { UserPrimitive } from './user.entity';

export interface ReportedCompanyChatPrimitive {
  id: number;
  reportedCompanyId: number;
  userId: number;
  message: string;
  createdAt: Date;
  updatedAt: Date | null;
  author?: string; // no esta en la base de datos, es solo para respuestas
  user?: UserPrimitive;
}

export class ReportedCompanyChatEntity {
  constructor(private readonly attributes: ReportedCompanyChatPrimitive) {}

  get values(): ReportedCompanyChatPrimitive {
    return this.attributes;
  }

  static fromArrayToJsonResponse(
    data: Partial<ReportedCompanyChatPrimitive>[],
  ): Partial<ReportedCompanyChatPrimitive>[] {
    return data.map((item) => ({
      id: item.id,
      reportedCompanyId: item.reportedCompanyId,
      message: item.message,
      createdAt: item.createdAt,
      userId: item.userId,
      author: item.user?.nickname, // no esta en la base de datos, es solo para respuestas
    }));
  }

  static toJsonResponse(
    data: Partial<ReportedCompanyChatPrimitive>,
  ): Partial<ReportedCompanyChatPrimitive> {
    return {
      id: data.id,
      reportedCompanyId: data.reportedCompanyId,
      message: data.message,
      createdAt: data.createdAt,
      userId: data.userId,
      author: data.user?.nickname, // no esta en la base de datos, es solo para respuestas
    };
  }
}
