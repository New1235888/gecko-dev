/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

/**
 * Update:    <srcdir>/tools/@types/index.d.ts,
 *
 * reference: <objdir>/dist/@types/lib.gecko.*.d.json,
 *            generated by a ts build lib step.
 */

const fs = require("fs");
const libs = ["dom", "nsresult", "services", "xpcom"];

function main(index_dts, lib_dir) {
  let index = fs.readFileSync(index_dts, "utf8");

  for (let lib of libs) {
    let file = `lib.gecko.${lib}.d.ts`;
    let path = `${lib_dir}/${file}`;
    let found = fs.existsSync(path);
    console.log(`[INFO] ${path} (found: ${found})`);

    if (found) {
      let re = RegExp(` types=".+/${file}" />`);
      index = index.replace(re, ` types="${path}" />`);
    }
  }

  console.log(`[INFO] ${index_dts} (${index.length.toLocaleString()} bytes)`);
  fs.writeFileSync(index_dts, index);
}

main(...process.argv.slice(2));
