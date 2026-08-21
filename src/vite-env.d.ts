/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form ID — see src/lib/emailService.ts for setup. */
  readonly VITE_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
