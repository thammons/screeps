// import { loop } from "../../src/main";
// import { Game, Memory } from "./mock";

describe("main", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
  //   beforeAll(() => {
  //     // runs before all test in this block
  //   });

  //   beforeEach(() => {
  //     // runs before each test in this block
  //     // @ts-ignore : allow adding Game to global
  //     global.Game = _.clone(Game);
  //     // @ts-ignore : allow adding Memory to global
  //     global.Memory = _.clone(Memory);
  //   });

  //   it("should export a loop function", () => {
  //     expect(typeof loop === "function");
  //   });

  //   it("should return void when called with no context", () => {
  //     expect(loop()).toBeUndefined();
  //   });

  //   it("Automatically delete memory of missing creeps", () => {
  //     Memory.creeps.persistValue = "any value";
  //     Memory.creeps.notPersistValue = "any value";

  //     Game.creeps.persistValue = "any value";

  //     loop();

  //     expect(Memory.creeps.persistValue).toBeDefined();
  //     expect(Memory.creeps.notPersistValue).toBeUndefined();
  //   });
});
