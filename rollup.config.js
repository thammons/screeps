"use strict";

// const clear = require("rollup-plugin-clear");
// const resolve = require("@rollup/plugin-node-resolve");
// const commonjs = require("@rollup/plugin-commonjs");
// const typescript = require("rollup-plugin-typescript2");
// const screeps = require("rollup-plugin-screeps");
// const copy  = require("rollup-plugin-copy");

// const dotenv = require('dotenv');

import clear from "rollup-plugin-clear";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";
import copy from "rollup-plugin-copy";
import dotenv from 'dotenv';
const configResult = dotenv.config({ path: `.env.${process.env.NODE_ENV?.trim()}` });

console.log(configResult);
console.log(process.env.NODE_ENV);
console.log(process.env.LOCAL_DIST);

const plugins = [
  clear({ targets: ["dist"] }),
  resolve({ rootDir: "src" }),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" })
];

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log("No destination specified - code will be compiled but not uploaded");
} else if (dest === "local") {
  if (!process.env.LOCAL_DIST) {
    throw new Error("No LOCAL_DIST specified");
  }

  plugins.push(
    copy({
      targets: [
        {
          src: "./dist/**/*",
          dest: process.env.LOCAL_DIST
        }
      ],
      hook: "writeBundle",
      verbose: true
    })
  );
} else if ((cfg = require("./screeps.json")[dest]) == null) {
  throw new Error("Invalid upload destination");
} else {
  plugins.push(screeps({ config: cfg }));
}

module.exports = {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: true
  },

  plugins: plugins
};
