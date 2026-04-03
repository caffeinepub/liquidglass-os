import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface NodeInput {
    id: string;
    region: string;
    owner: string;
    name: string;
    hardware: {
        storageGB: bigint;
        ramGB: bigint;
        cpuCores: bigint;
    };
    config: {
        port: bigint;
        autoRestart: boolean;
        version: string;
        backupEnabled: boolean;
        maxPlayers: bigint;
    };
}
export type Time = bigint;
export interface NodeConfig {
    port: bigint;
    autoRestart: boolean;
    version: string;
    backupEnabled: boolean;
    maxPlayers: bigint;
}
export interface Node {
    id: string;
    region: string;
    status: Status;
    owner: string;
    name: string;
    createdAt: Time;
    hardware: {
        storageGB: bigint;
        ramGB: bigint;
        cpuCores: bigint;
    };
    config: {
        port: bigint;
        autoRestart: boolean;
        version: string;
        backupEnabled: boolean;
        maxPlayers: bigint;
    };
}
export enum Status {
    starting = "starting",
    error = "error",
    available = "available",
    updating = "updating",
    booting = "booting",
    shuttingDown = "shuttingDown",
    offline = "offline",
    running = "running"
}
export interface backendInterface {
    createNode(input: NodeInput): Promise<Node>;
    deleteNode(id: string): Promise<void>;
    getAllNodes(): Promise<Array<Node>>;
    getNode(id: string): Promise<Node | null>;
    getNodesByOwner(owner: string): Promise<Array<Node>>;
    updateNodeConfig(id: string, config: NodeConfig): Promise<Node>;
    updateNodeStatus(id: string, status: Status): Promise<Node>;
}
