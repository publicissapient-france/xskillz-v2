'use strict';

const gravatar = require('gravatar');

class User {

  constructor(raw) {
    this.name = raw.name;
    this.id = raw.id;
    this.gravatarUrl = gravatar.url(raw.email);
    this.experienceCounter = raw.diploma ? new Date().getFullYear() - new Date(raw.diploma).getFullYear() : 0;
    this.phone = raw.phone;
    this.manager_id = raw.manager_id;
    this.readable_id = User.toReadableId(raw.name);
    this.address = raw.address ? JSON.parse(raw.address) : null;
    this.home = raw.home ? JSON.parse(raw.home) : null;
    this.seniority = raw.employee_date ? new Date().getFullYear() - new Date(raw.employee_date).getFullYear() : 0;
    this.domains = raw.domains;
    this.score = raw.score;
    this.availability_date = raw.availability_date;
    this.default_password = raw.default_password === 1;
    this.employee_date = raw.employee_date;
    this.diploma = raw.diploma;
  }

  expurge() {
    delete this.password;
    delete this.default_password;
    return this;
  }

  static toReadableId(name) {
    if (name) {
      return name.toLowerCase().replace(/ /g, "-");
    }
  }

}

module.exports = User;