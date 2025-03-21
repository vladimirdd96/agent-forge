"use client";

import { useState } from "react";
import { useWallet } from "@/app/providers";
import type { CreateAgentInput, AgentParameter } from "@/types/agent";

export default function CreateAgentForm() {
  const { connected } = useWallet();
  const [formData, setFormData] = useState<CreateAgentInput>({
    name: "",
    description: "",
    capabilities: [],
    parameters: [],
    price: "",
  });

  const [newCapability, setNewCapability] = useState("");
  const [newParameter, setNewParameter] = useState<AgentParameter>({
    name: "",
    type: "string",
    description: "",
    required: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }
    // TODO: Implement agent creation logic with Solana
    console.log("Creating agent:", formData);
  };

  const addCapability = () => {
    if (newCapability.trim()) {
      setFormData({
        ...formData,
        capabilities: [...formData.capabilities, newCapability.trim()],
      });
      setNewCapability("");
    }
  };

  const addParameter = () => {
    if (newParameter.name.trim() && newParameter.description.trim()) {
      setFormData({
        ...formData,
        parameters: [...formData.parameters, { ...newParameter }],
      });
      setNewParameter({
        name: "",
        type: "string",
        description: "",
        required: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-background border border-border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-background border border-border rounded-md p-2 h-24"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Price (SOL)</label>
        <input
          type="number"
          step="0.1"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full bg-background border border-border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Capabilities</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newCapability}
            onChange={(e) => setNewCapability(e.target.value)}
            className="flex-1 bg-background border border-border rounded-md p-2"
            placeholder="Add a capability"
          />
          <button
            type="button"
            onClick={addCapability}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {formData.capabilities.map((cap, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="flex-1 text-sm">{cap}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    capabilities: formData.capabilities.filter((_, i) => i !== index),
                  })
                }
                className="text-destructive hover:text-destructive/80"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Parameters</label>
        <div className="space-y-2 mb-2">
          <input
            type="text"
            value={newParameter.name}
            onChange={(e) =>
              setNewParameter({ ...newParameter, name: e.target.value })
            }
            className="w-full bg-background border border-border rounded-md p-2"
            placeholder="Parameter name"
          />
          <select
            value={newParameter.type}
            onChange={(e) =>
              setNewParameter({
                ...newParameter,
                type: e.target.value as AgentParameter["type"],
              })
            }
            className="w-full bg-background border border-border rounded-md p-2"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="array">Array</option>
          </select>
          <input
            type="text"
            value={newParameter.description}
            onChange={(e) =>
              setNewParameter({ ...newParameter, description: e.target.value })
            }
            className="w-full bg-background border border-border rounded-md p-2"
            placeholder="Parameter description"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newParameter.required}
              onChange={(e) =>
                setNewParameter({ ...newParameter, required: e.target.checked })
              }
              className="bg-background border border-border rounded"
            />
            <label className="text-sm">Required</label>
          </div>
          <button
            type="button"
            onClick={addParameter}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Add Parameter
          </button>
        </div>
        <ul className="space-y-2">
          {formData.parameters.map((param, index) => (
            <li key={index} className="glass-panel p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{param.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      parameters: formData.parameters.filter((_, i) => i !== index),
                    })
                  }
                  className="text-destructive hover:text-destructive/80"
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-muted-foreground">{param.description}</p>
              <div className="text-xs text-muted-foreground mt-1">
                Type: {param.type} | {param.required ? "Required" : "Optional"}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={!connected}
        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed neon-border"
      >
        {connected ? "Create Agent" : "Connect Wallet to Create"}
      </button>
    </form>
  );
} 