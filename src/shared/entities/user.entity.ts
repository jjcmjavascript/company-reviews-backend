export interface UserPrimitive {
  id: number;
  name: string;
  lastname?: string;
  tax?: string;
  email: string;
  deletedAt?: Date;
  nickname?: string;
}

export class User {
  private attributes: UserPrimitive;

  constructor(readonly user: UserPrimitive) {
    this.attributes = user;
  }

  static create(user: Partial<UserPrimitive>): User {
    return new User({
      id: user.id,
      name: user.email,
      email: user.email,
      tax: user.tax,
      deletedAt: user.deletedAt,
    });
  }

  toPrimitive(): UserPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
    };
  }

  static toJsonResponse(user: UserPrimitive): Partial<UserPrimitive> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
    };
  }

  static fromArray(users: Array<UserPrimitive>): Array<User> {
    return users.map((user) => new User(user));
  }

  static fromArrayToJsonResponse(
    users: Array<UserPrimitive>,
  ): Array<UserPrimitive> {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
    }));
  }

  get values(): UserPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
      deletedAt: this.attributes.deletedAt,
    };
  }
}
