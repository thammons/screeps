import creepFactory from "./creeps/creep.factory.js";

export function gameLoop() {
  try {
    /*
https://screeps.com/forum/topic/2556/workflow-tips-and-prioritization-for-new-players/3

Early Focus:
- Static Mining
- Road
- Rampart
- Wall repairs
- Multiple rooms

look into remotes before GCL7

Get to RCL 8, get more rooms, get those rooms to RCL 8



*/

    /* when controller (upgrader) gets to 2 (Room Control Level 2 / RCL2)
        - build 5 STRUCTURE_EXTENSION
        - add upgraders (next goal 45k energy)
        - add road to controller
       when RCL3
        - Build tower immediately
    */

    const spawn = Game.spawns["Spawn1"];

    var tower = Game.getObjectById("9cf599f3d9cc8c40f86e5747") as StructureTower;
    if (tower) {
      var closestDamagedStructure = tower.pos.findClosestByRange(
        FIND_STRUCTURES,
        {
          filter: structure => structure.hits < structure.hitsMax,
        },
      );
      if (closestDamagedStructure) {
        tower.repair(closestDamagedStructure);
      }

      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      }
    }

    //TODO: Build Structures
    // const structureExtensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
    //     filter: function(s){
    //         console.log(s.structureType);
    //         return false;
    //     }
    // });
    //if()
    //TODO: figure out a better way to place these based on spawn and walls
    //Game.spawns['Spawn1'].room.createConstructionSite(27,27, STRUCTURE_EXTENSION)

    creepFactory.spawnNew();

    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      if (creep.memory.role == "harvester") {
        roleHarvester.run(creep);
      }
      if (creep.memory.role == "upgrader") {
        roleUpgrader.run(creep);
      }
      if (creep.memory.role == "builder") {
        roleBuilder.run(creep);
      }
    }

    // doAction(spawn.room);

    //TODO: figure out a better way to place these based on spawn and walls
    //Game.spawns['Spawn1'].room.createConstructionSite(27,27, STRUCTURE_EXTENSION)

    //TODO: Build Structures
    // const structureExtensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
    //     filter: function(s){
    //         console.log(s.structureType);
    //         return false;
    //     }
    // });
    //if()
    // const haulers = creepFactory.getHaulersToMaintain(spawn);
    // creepFactory.spawnNew(spawn, haulers);

    //   runHaulers(spawn.room);

    // for (var name in Game.creeps) {
    //   const creep = Game.creeps[name];
    //   if (creep.memory.role == "harvester") {
    //     roleHarvester.run(creep);
    //   }
    //   if (creep.memory.role == "upgrader") {
    //     roleUpgrader.run(creep);
    //   }
    //   if (creep.memory.role == "builder") {
    //     roleBuilder.run(creep);
    //   }
    // }
  } catch (err) {
    global.log.error("ERROR! " + err);
  }
}
