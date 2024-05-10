/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.factory');
 * mod.thing == 'a thing'; // true
 */

type CreepToMaintain = {
  role: Role;
  size: Size;
  maxCount: number;
};

export default {
  spawnNew: function () {
    console.log(
      "spawn ratio " +
        Game.spawns["Spawn1"].energy / Game.spawns["Spawn1"].energyCapacity,
    );

    if (
      Game.spawns["Spawn1"].energy / Game.spawns["Spawn1"].energyCapacity <
      0.5
    ) {
      console.log("not enough energy: break");
      return;
    }

    //TODO: Make LIGHT vs HEAVY time based

    const creepsToMaintain: CreepToMaintain[] = [];

    const startMedium = 7;
    const numMyCreeps = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS).length;
    console.log(numMyCreeps);
    if (numMyCreeps < startMedium) {
      creepsToMaintain.push(
        { role: "harvester", size: "LIGHT", maxCount: 2 },
        { role: "upgrader", size: "LIGHT", maxCount: 2 },
        { role: "builder", size: "LIGHT", maxCount: 3 },
      );
    } else if (numMyCreeps >= startMedium) {
      creepsToMaintain.push(
        { role: "harvester", size: "MEDIUM", maxCount: 2 },
        { role: "builder", size: "MEDIUM", maxCount: 2 },
        { role: "upgrader", size: "MEDIUM", maxCount: 2 },
      );
    }

    for (const roleItem of creepsToMaintain) {
      console.log("roleItem", JSON.stringify(roleItem));
      const items = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS, {
        filter: function (c) {
          if (c.memory == undefined) return false;
          return (
            c.memory.role == roleItem.role &&
            ((c.memory.size == undefined && roleItem.size == "LIGHT") ||
              c.memory.size == roleItem.size)
          );
        },
      });
      if (items.length < roleItem.maxCount) {
        console.log("spawn creep " + JSON.stringify(roleItem));
        this.spawn("Spawn1", roleItem.size, roleItem.role);
        break;
      } else {
        console.log("Enough " + roleItem.role + "s already created!");
      }
    }
  },
  spawn: function (spawnName: string, size: Size, role: Role) {
    let bodySize: BodyPartConstant[] = [];
    switch (size) {
      case "LIGHT":
        bodySize = [WORK, CARRY, MOVE];
        break;
      case "MEDIUM":
        bodySize = [WORK, CARRY, CARRY, MOVE, MOVE];
        break;
    }
    Game.spawns[spawnName].spawnCreep(
      bodySize,
      `${role}-${size}-${Game.time}`,
      {
        memory: { role: role, size: size, working: false },
      },
    );
  },
};
