var guid = require('../guid.js');
module.exports = function(obj) {
  var identifier = guid(obj),
    itemIdentifier = 'item_' + identifier,
    identifierref = 'resource_' + identifier,
    organization = obj.organization.replace(/ /g, '_');
  if (obj.identifier) {
    if (obj.identifier.trim()) {
      var ri = obj.identifier.replace(/ /g, '');
      itemIdentifier = 'item_' + ri;
      identifierref = 'resource_' + ri;
    }
  }
  return {
    '@identifier': identifier,
    '@version': 1,
    '@xmlns:adlnav': 'http://www.adlnet.org/xsd/adlnav_v1p3',
    '@xmlns': 'http://www.imsglobal.org/xsd/imscp_v1p1',
    '@xmlns:adlseq': 'http://www.adlnet.org/xsd/adlseq_v1p3',
    '@xmlns:imsss': 'http://www.imsglobal.org/xsd/imsss',
    '@xmlns:adlcp': 'http://www.adlnet.org/xsd/adlcp_v1p3',
    '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    '@xsi:schemaLocation':
      'http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd ' +
      'http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd ' +
      'http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd ' +
      'http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd ' +
      'http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd',
    metadata: {
      schema: 'ADL SCORM',
      schemaversion: obj.version,
      'adlcp:location': 'metadata.xml',
    },
    organizations: {
      '@default': organization,
      organization: {
        '@identifier': organization,
        title: obj.title,
        item: {
          '@identifier': itemIdentifier,
          '@identifierref': identifierref,
          title: obj.title,
          'imsss:sequencing': {
            'imsss:deliveryControls': {
              '@tracked': 'true',
              '@completionSetByContent': 'true',
              '@objectiveSetByContent': 'true',
            },
          },
          'adlnav:presentation': {
            'adlnav:navigationInterface': [
              { 'adlnav:hideLMSUI': 'previous' },
              { 'adlnav:hideLMSUI': 'continue' },
              { 'adlnav:hideLMSUI': 'exit' },
              { 'adlnav:hideLMSUI': 'abandon' },
            ],
          },
          'adlcp:timeLimitAction': 'continue, no message',
        },
        'imsss:sequencing': {
          'imsss:controlMode': {
            '@choice': 'true',
            '@flow': 'true',
          },
        },
      },
    },
    resources: {
      resource: {
        '@identifier': identifierref,
        '@type': 'webcontent',
        '@href': obj.startingPage,
        '@adlcp:scormType': 'sco',
        file: obj.files,
      },
    },
  };
};
