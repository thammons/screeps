import { gameLoop } from "game";
import { ErrorMapper } from "utils/ErrorMapper";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: {
        print: (color?: string, ...args: any[]) => void;
        info: (...args: any[]) => void;
        error: (...args: any[]) => void;
        warn: (...args: any[]) => void;
      };
    }
  }
}

global.log = {
  print: function (color?: string, ...args: any[]) {
    if (!color) {
      console.log(args.join(" "));
    } else {
      console.log(
        `<span style='color:${color}'>${args.join(" ")}</span>`,
      );
    }
  },
  info: function (...args: any[]) {
    this.print(undefined, args);
  },
  error: function (...args: any[]) {
    this.print("red", ...args);
  },
  warn: function (...args: any[]) {
    this.print("yellow", ...args);
  },
};

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  gameLoop();
});
