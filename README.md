# outrun-content-pipeline

Content pipeline for Outrun games

[![Build Status](https://travis-ci.org/outrunlabs/outrun-content-pipeline.svg?branch=master)](https://travis-ci.org/outrunlabs/outrun-content-pipeline)
[![codecov](https://codecov.io/gh/outrunlabs/outrun-content-pipeline/branch/master/graph/badge.svg)](https://codecov.io/gh/outrunlabs/outrun-content-pipeline)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![npm version](https://badge.fury.io/js/outrun-content-pipeline.svg)](https://www.npmjs.com/packages/outrun-content-pipeline)

## Why?

Assets for games come in all shapes and sizes - and significant time needs to be spent parsing these assets, and optimizing them per-platform. It doesn't make sense to do this during runtime (although you can, if you want, for testing) - so this tooling compiles assets to `orb` binary files, which are optimized for downloading. In addition, this also provides some metadata so that assets can be streamed on-demand, and even allow for small placeholder assets to be used in the meantime.

## Usage

```
yarn add outrun-content-pipeline
```

This exposes a `content` command.

You can then run `content build`. By default, this will look at the `assets` folder at the root, compile all the assets it knows, and then output to `dist/assets`. These can be configured in your `package.json`.

## License

Outrun Lab's OSS projects are licensed under the [GPL v3](./LICENSE.md).
