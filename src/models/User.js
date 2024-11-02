export default class User {
  #email = null;

  #name = null;

  #phone = null;

  #userUuid = null;

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get phone() {
    return this.#phone;
  }

  set phone(value) {
    this.#phone = value;
  }

  get userUuid() {
    return this.#userUuid;
  }

  set userUuid(value) {
    this.#userUuid = value;
  }

  constructor(data) {
    if (data) {
      this.#email = data.email || null;
      this.#name = data.name || null;
      this.#phone = data.phone || null;
      this.#userUuid = data.userUuid || null;
    }
  }
}
