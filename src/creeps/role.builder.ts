var roleBuilder = {
  run: function (creep: Creep) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
      //PULLED FROM HARVEST
      // if(Game.spawns["Spawn1"].energy / Game.spawns["Spawn1"].energyCapacity > 0) {
      //           var targets = creep.room.find(FIND_STRUCTURES, {
      //             filter: (structure) => {
      //                 return (structure.structureType == STRUCTURE_EXTENSION ||
      //                         structure.structureType == STRUCTURE_SPAWN ||
      //                         structure.structureType == STRUCTURE_TOWER) &&
      //                         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      //             }
      //         });
      //         if(targets.length > 0) {
      //             if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      //             }
      //       }
      //   }
      //   else {
      creep.memory.working = true;
      creep.say("🚧 build");
      // }
    }

    if (creep.memory.working) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  },
};

module.exports = roleBuilder;
