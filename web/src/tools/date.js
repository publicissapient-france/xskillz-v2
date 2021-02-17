import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;
// Use the native Intl.DateTimeFormat if available, or a polyfill if not.
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}

export default DateTimeFormat;


