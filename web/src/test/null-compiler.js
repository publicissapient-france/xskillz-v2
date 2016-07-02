function noop() { return null; }

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;