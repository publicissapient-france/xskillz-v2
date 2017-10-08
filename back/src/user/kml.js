class Kml {
    constructor(users) {
        this.users = users;
    }

    static UserToPlacemark(user) {
        return `<Placemark><name>${user.name}</name><Point><coordinates>${user.address.lng},${user.address.lat}</coordinates></Point></Placemark>`;
    }

    toString() {
        return `<?xml version="1.0" encoding="utf-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document>${this.users.map(Kml.UserToPlacemark)}</Document></kml>`;
    }
}

module.exports = Kml;