export interface UserPrimitive {
  id: number;
  name: string;
  lastname?: string;
  tax?: string;
  email: string;
  deletedAt?: Date;
  nickName?: string;
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
      nickName: user.nickName,
      deletedAt: user.deletedAt,
    });
  }

  toPrimitive(): UserPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
      nickName: this.attributes.nickName,
    };
  }

  static toJsonResponse(
    user: UserPrimitive,
  ): Pick<UserPrimitive, 'id' | 'nickName'> {
    return {
      id: user.id,
      nickName: user.nickName,
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
      nickName: user.nickName,
    }));
  }

  get values(): UserPrimitive {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
      deletedAt: this.attributes.deletedAt,
      nickName: this.attributes.nickName,
    };
  }
}
