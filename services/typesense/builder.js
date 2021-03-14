'use strict';

// Modules
const _ = require('lodash');

// Builder
module.exports = {
  name: 'typesense',
  config: {
    version: '0.19.0',
    supported: ['0.19.0', '0.18.0', '0.17.0'],
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
          TYPESENSE_CONFIG: '/etc/typesense/typesense.ini'
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
