
type Size = "LIGHT" | "MEDIUM" | "HEAVY" | "EXTRA_HEAVY" | "ULTRA_HEAVY" | "MEGA_HEAVY";

interface RoomMemory {
  haulerSizePhase?: Size;
  isRepairing?: boolean;
}

type Role = "hauler" | "harvester" | "upgrader" | "builder";

type WorkMode =
  | "harvest"
  | "transfer"
  | "build"
  | "upgrade"
  | "repair"
  | undefined;

type HarvestMode = 'harvest' | 'move' | undefined;

interface CreepMemory {
  role: Role;
  // room: string;
  // workMode: WorkMode;
  size?: Size;
  working?: boolean;
  // targetPos?: RoomPosition;
  // harvestMode?: HarvestMode;
}

type CreepToMaintain = {
  role: Role;
  size: Size;
};

interface Hauler {
  canWork: boolean;
  workMode: WorkMode;
  startWorkMessage: string;
  startWorkCondition: () => boolean;
  stopWorkCondition: () => boolean;
  log: () => void;
  work: () => boolean;
}
