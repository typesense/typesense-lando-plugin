'use strict';

// Modules
const _ = {
  set: require('lodash.set'),
  merge: require('lodash.merge')
}


function getTypesenseOptions(options) {
  const result = {};
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key) && key.startsWith('TYPESENSE_')) {
      result[key] = options[key];
    }
  }

  return result;
}


// Builder
module.exports = {
  name: 'typesense',
  config: {
    version: '29.0',
    supported: ['29.0', '28.0', '27.1', '27.0', '26.0', '0.25.2', '0.25.1', '0.25.0', '0.24.1', '0.24.0', '0.23.1', '0.23.0', '0.22.2', '0.22.1', '0.22.0', '0.21.0', '0.20.0', '0.19.0', '0.18.0', '0.17.0'],
    patchesSupported: true,
    confSrc: __dirname,
    port: '8108',
    apiKey: 'xyz',
    defaultFiles: {
      server: 'typesense.ini',
    },
    remoteFiles: {
      server: '/etc/typesense/typesense.ini',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoTypesense extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      const typesense = {
        image: `typesense/typesense:${options.version}`,
        command: '/opt/typesense-server',
        environment: {
          TYPESENSE_API_KEY: options.apiKey,
          TYPESENSE_DATA_DIR: '/data',
          TYPESENSE_CONFIG: '/etc/typesense/typesense.ini',
          ...getTypesenseOptions(options),
        },
        ports: ['8108'],
        volumes: [
          `${options.confDest}/${options.defaultFiles.server}:${options.remoteFiles.server}`,
          `${options.data}:/data`,
        ],
      };
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, typesense)});
    };
  },
};
