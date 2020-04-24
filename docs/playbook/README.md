```sh
ng generate @nrwl/workspace:library --name=components --directory=web --tags=scope:web,type:ui
```

```sh
ng generate @schematics/angular:component --name=card --project=web-elements --skipTests --type=Element --viewEncapsulation=ShadowDom
```

```sh
ng generate @nrwl/workspace:library --name=http --directory=web --tags=scope:web,type:utils
```

```sh
ng generate @nrwl/workspace:library --name=assets --directory=shared --no-interactive --dry-run <

CREATE libs/shared/assets/tslint.json (100 bytes)
CREATE libs/shared/assets/README.md (180 bytes)
CREATE libs/shared/assets/tsconfig.json (126 bytes)
CREATE libs/shared/assets/tsconfig.lib.json (175 bytes)
CREATE libs/shared/assets/src/index.ts (37 bytes)
CREATE libs/shared/assets/src/lib/shared-assets.ts (0 bytes)
CREATE libs/shared/assets/jest.config.js (256 bytes)
CREATE libs/shared/assets/tsconfig.spec.json (276 bytes)
UPDATE tsconfig.json (708 bytes)
UPDATE angular.json (6952 bytes)
UPDATE nx.json (760 bytes)

NOTE: The "dryRun" flag means no changes were made.
```