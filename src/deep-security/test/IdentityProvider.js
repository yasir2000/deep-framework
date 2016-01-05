'use strict';

import chai from 'chai';
import {IdentityProvider} from '../lib/IdentityProvider';
import {MissingLoginProviderException} from '../lib/Exception/MissingLoginProviderException';

suite('IdentityProvider', function() {
  let identityProvider = null;
  let providerName = 'facebook';
  let identityMetadata = {
    access_token: 'test_userToken',
    tokenExpirationTime: new Date(),
    user_id: 'test_userId',
  };
  let providers = {
    amazon: {
      name: IdentityProvider.AMAZON,
      data: {},
    },
    facebook: {
      name: IdentityProvider.FACEBOOK,
      data: {},
    },
    google: {
      name: IdentityProvider.GOOGLE,
      data: {},
    },
  };

  test('Class IdentityProvider exists in IdentityProvider', function() {
    chai.expect(typeof IdentityProvider).to.equal('function');
  });

  test('Check AMAZON static getter returns value "www.amazon.com"', function() {
    chai.expect(IdentityProvider.AMAZON).to.be.equal('www.amazon.com');
  });

  test('Check FACEBOOK static getter returns value "graph.facebook.com"', function() {
    chai.expect(IdentityProvider.FACEBOOK).to.be.equal('graph.facebook.com');
  });

  test('Check GOOGLE static getter returns value "graph.facebook.com"', function() {
    chai.expect(IdentityProvider.GOOGLE).to.be.equal('accounts.google.com');
  });

  test('Check constructor sets values by default', function() {
    identityProvider = new IdentityProvider(providers, providerName, identityMetadata);

    chai.expect(identityProvider.providers).to.be.eql(providers);
    chai.expect(identityProvider.name).to.be.eql(providerName);
    chai.expect(identityProvider.userToken).to.be.eql(identityMetadata.access_token);
    chai.expect(identityProvider.userId).to.be.eql(identityMetadata.user_id);
    chai.expect(identityProvider.tokenExpirationTime).to.be.eql(identityMetadata.tokenExpirationTime);
  });

  test('Check constructor throws "MissingLoginProviderException" for missing provider', function() {
    let error = null;

    try {
      identityProvider = new IdentityProvider(providers, 'missing_provider', identityMetadata);
    } catch (e) {
      error = e;
    }

    chai.assert.instanceOf(
      error, MissingLoginProviderException, 'error is an instance of MissingLoginProviderException'
    );
  });

  test('Check config() throws "MissingLoginProviderException" for missing provider', function() {
    let actualResult = identityProvider.config(providerName);

    chai.expect(actualResult).to.eql(providers[providerName]);
  });

  test('Check config() throws "MissingLoginProviderException" for missing provider', function() {
    let error = null;

    try {
      identityProvider.config('missing_provider');
    } catch (e) {
      error = e;
    }

    chai.assert.instanceOf(
      error, MissingLoginProviderException, 'error is an instance of MissingLoginProviderException'
    );
  });
});
