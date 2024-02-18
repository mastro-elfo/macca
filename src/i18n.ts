import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-chained-backend";
import Fetch from "i18next-fetch-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import { merge } from "lodash";
import { initReactI18next } from "react-i18next";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";
import zodEn from "zod-i18n-map/locales/en/zod.json";
import zodIt from "zod-i18n-map/locales/it/zod.json";
import zodItCustom from "./locales/it/zodCustom.json";
import zodItFix from "./locales/it/zodFix.json";

const expirationTime =
  Number(import.meta.env.VITE_I18N_EXPIRATION_TIME) || 86400000;

await i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, Fetch],
      backendOptions: [
        {
          expirationTime: Number.isNaN(expirationTime)
            ? 86400000
            : expirationTime,
        },
        {
          loadPath: "/macca/locales/{{lng}}/{{ns}}.json",
        },
      ],
    },
    partialBundledLanguages: true,
    resources: {
      en: {
        zod: zodEn,
      },
      it: {
        zod: merge(zodIt, zodItFix),
        zodCustom: zodItCustom,
      },
    },
    fallbackLng: String(import.meta.env.VITE_I18N_FALLBACK_LANGUAGE),
    fallbackNS: "translation",
  });

z.setErrorMap(makeZodI18nMap({ ns: ["zod", "zodCustom"] }));

export default i18n;
