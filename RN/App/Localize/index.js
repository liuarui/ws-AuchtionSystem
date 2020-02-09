import React from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash/memoize';
import storage from '@Utils/storage';

import { I18nManager } from 'react-native';

const translationGetters = {
  en: () => require('./i18n/en_us.json'),
  zh: () => require('./i18n/zh_cn.json'),
};

export async function setI18nConfig() {
<<<<<<< HEAD:RN/App/Localize/index.js
  const { languageTag, isRTL } = await getCurrentLanguage()

  translate.cache.clear()
  I18nManager.forceRTL(isRTL)
=======
  const { languageTag, isRTL } = await getCurrentLanguage();

  translate.cache.clear();
  I18nManager.forceRTL(isRTL);
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Localize/index.js

  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
}

export async function setCurrentLanguage(languageTag) {
  storage.save('languageTag', languageTag).then(_ => {
    i18n.locale = languageTag;
  });
}

export async function getCurrentLanguage() {
  const fallback = { languageTag: 'en', isRTL: false },
<<<<<<< HEAD:RN/App/Localize/index.js

    languageConfig = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback

  let { languageTag } = languageConfig
  const { isRTL } = languageConfig,
    localLang = await storage.get('languageTag')

  languageTag = localLang || languageTag
  return { languageTag, isRTL }
=======
    languageConfig =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

  let { languageTag } = languageConfig;
  const { isRTL } = languageConfig,
    localLang = await storage.get('languageTag');

  languageTag = localLang || languageTag;
  return { languageTag, isRTL };
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Localize/index.js
}

const translate = memoize(
  (key, config) => i18n.t(key, config),
<<<<<<< HEAD:RN/App/Localize/index.js
  (key, config) => config ? key + JSON.stringify(config) : key,
)
=======
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
>>>>>>> 465fd0d2e97a74c7c7e7d5c125a4109d94d6871e:App/Localize/index.js

export default translate;
