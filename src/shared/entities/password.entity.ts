export interface PasswordPrimitive {
  id: number;
  userId: number;
  password: string;
}

export class Password {
  private attributes: PasswordPrimitive;

  constructor(readonly password: PasswordPrimitive) {
    this.attributes = password;
  }

  static create(password: Partial<PasswordPrimitive>): Password {
    return new Password({
      id: password.id,
      userId: password.userId,
      password: password.password,
    });
  }

  toPrimitive(): PasswordPrimitive {
    return {
      id: this.attributes.id,
      userId: this.attributes.userId,
      password: this.attributes.password,
    };
  }

  get values() {
    return {
      id: this.attributes.id,
      userId: this.attributes.userId,
      password: this.attributes.password,
    };
  }
}
