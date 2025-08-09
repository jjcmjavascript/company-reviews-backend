export interface UserPrimitive {
  id: number;
  name: string;
  lastname?: string;
  tax?: string;
  email: string;
  deletedAt?: Date;
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
      deletedAt: this.attributes.deletedAt,
    };
  }

  static fromArray(users: Array<UserPrimitive>): Array<User> {
    return users.map((user) => new User(user));
  }

  get values() {
    return {
      id: this.attributes.id,
      name: this.attributes.name,
      email: this.attributes.email,
      tax: this.attributes.tax,
      deletedAt: this.attributes.deletedAt,
    };
  }
}
