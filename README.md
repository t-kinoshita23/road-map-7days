# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

src/
├── features/ # 機能単位（jobs と同じ発想）
│ ├── registration/
│ ├── userManagement/
│ ├── notifications/
│ └── adminPanel/
├── components/ # UI 部品（汎用コンポーネント）
├── hooks/ # カスタム Hook 群
├── lib/ # 汎用関数・ユーティリティ
├── pages/ # ルーティング対象のページ
├── types/ # 型定義（TypeScript）
├── assets/ # 画像・音声・フォントなど
└── styles/ # CSS や Tailwind 設定

src/
└── jobs/
├── registration/ # ユーザー登録・プロフィール管理
│ ├── RegistrationForm.tsx
│ ├── ProfileEditPage.tsx
│ ├── useProfile.ts
│ └── types.ts
├── admin/ # 管理者によるユーザー操作
├── notifications/ # 通知設定・送信処理
└── mediaUpload/ # 画像アップロード・Storage 連携

# jobs/registration

この jobs/registration/は、ユーザーの登録・プロフィール編集・閲覧を担う機能群です。
Supabase の`auth`と`profiles`テーブルを使用しています。
