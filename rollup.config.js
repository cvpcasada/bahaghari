import R from 'ramda';

import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from 'rollup-plugin-replace';

import pkg from "./package.json";

const plugins = [
  resolve({
    preferBuiltins: true
  }),
  commonjs({
    ignoreGlobal: true,  
    include: "node_modules/**"
  }),
  babel({
    exclude: "node_modules/**"
  }),
  replace({
    __DEV__: JSON.stringify(false)
  })
];

const configBase = {
  input: "src/index.js",
  external: R.concat(
    R.keys(pkg.peerDependencies),
    R.keys(pkg.dependencies)
  ),
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
    { file: pkg.main, format: 'cjs', sourcemap: true },
  ],
  plugins,
};

export default configBase;