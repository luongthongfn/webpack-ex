function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('./common', true, /\.js$/));
requireAll(require.context('./modules', true, /\.js$/));
requireAll(require.context('./vendor', true, /\.js$/));
