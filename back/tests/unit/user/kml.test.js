const assert = require('assert');

const Kml = require('../../../src/user/kml');

describe('Kml', () => {

    it('should create valid kml', done => {
        const users = [
            {
                name: 'Bob Martin',
                address: { "lng": "2.3271561999999903", "lat": "48.8762464" },
            },
            {
                name: 'Mark Zucky',
                address: { "lng": "2.422220100000004", "lat": "48.84973919999999" },
            }
        ];

        const kml = new Kml(users);
        assert.equal(kml.toString(), `<?xml version="1.0" encoding="utf-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><Placemark><name>Bob Martin</name><Point><coordinates>2.3271561999999903,48.8762464</coordinates></Point></Placemark>,<Placemark><name>Mark Zucky</name><Point><coordinates>2.422220100000004,48.84973919999999</coordinates></Point></Placemark></Document></kml>`);
        done();
    });
});