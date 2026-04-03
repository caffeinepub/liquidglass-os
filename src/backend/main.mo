import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Status = {
    #available;
    #offline;
    #running;
    #booting;
    #starting;
    #updating;
    #shuttingDown;
    #error;
  };

  type Node = {
    id : Text;
    owner : Text;
    name : Text;
    region : Text;
    status : Status;
    hardware : {
      ramGB : Nat;
      cpuCores : Nat;
      storageGB : Nat;
    };
    config : {
      port : Nat;
      version : Text;
      maxPlayers : Nat;
      autoRestart : Bool;
      backupEnabled : Bool;
    };
    createdAt : Time.Time;
  };

  type NodeInput = {
    id : Text;
    owner : Text;
    name : Text;
    region : Text;
    hardware : {
      ramGB : Nat;
      cpuCores : Nat;
      storageGB : Nat;
    };
    config : {
      port : Nat;
      version : Text;
      maxPlayers : Nat;
      autoRestart : Bool;
      backupEnabled : Bool;
    };
  };

  type NodeConfig = {
    port : Nat;
    version : Text;
    maxPlayers : Nat;
    autoRestart : Bool;
    backupEnabled : Bool;
  };

  let nodes = Map.empty<Text, Node>();

  public shared ({ caller }) func createNode(input : NodeInput) : async Node {
    let node : Node = {
      input with
      id = input.id;
      status = #available;
      createdAt = Time.now();
    };
    nodes.add(node.id, node);
    node;
  };

  public shared ({ caller }) func getNode(id : Text) : async ?Node {
    nodes.get(id);
  };

  public shared ({ caller }) func getNodesByOwner(owner : Text) : async [Node] {
    nodes.values().toArray().filter(func(n) { n.owner == owner });
  };

  public shared ({ caller }) func updateNodeStatus(id : Text, status : Status) : async Node {
    switch (nodes.get(id)) {
      case (null) { Runtime.trap("Node not found") };
      case (?node) {
        let updatedNode = { node with status };
        nodes.add(id, updatedNode);
        updatedNode;
      };
    };
  };

  public shared ({ caller }) func updateNodeConfig(id : Text, config : NodeConfig) : async Node {
    switch (nodes.get(id)) {
      case (null) { Runtime.trap("Node not found") };
      case (?node) {
        let updatedNode = { node with config };
        nodes.add(id, updatedNode);
        updatedNode;
      };
    };
  };

  public shared ({ caller }) func deleteNode(id : Text) : async () {
    if (not nodes.containsKey(id)) {
      Runtime.trap("Node not found");
    };
    nodes.remove(id);
  };

  public shared ({ caller }) func getAllNodes() : async [Node] {
    nodes.values().toArray();
  };
};
