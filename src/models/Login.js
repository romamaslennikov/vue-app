export default class Login {
  #login = null;

  #password = null;

  #pending = false;

  get login() {
    return this.#login;
  }

  set login(value) {
    this.#login = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    this.#password = value;
  }

  get pending() {
    return this.#pending;
  }

  set pending(value) {
    this.#pending = value;
  }

  constructor(data) {
    if (data) {
      this.#login = data.login || null;
      this.#password = data.password || null;
      this.#pending = data.pending || false;
    }
  }

  toRaw() {
    return {
      login: this.#login,
      password: this.#password,
      pending: this.#pending,
    };
  }
}
