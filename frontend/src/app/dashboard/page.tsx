"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { useWallet } from "@/app/providers";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Zap, Info, PlusCircle, Settings, Users } from "lucide-react";

// Sample data for the dashboard
const performanceData = [
  { name: "Mon", executions: 12 },
  { name: "Tue", executions: 19 },
  { name: "Wed", executions: 10 },
  { name: "Thu", executions: 22 },
  { name: "Fri", executions: 25 },
  { name: "Sat", executions: 18 },
  { name: "Sun", executions: 15 },
];

const myAgents = [
  {
    id: 1,
    name: "Trading Assistant",
    type: "Trading",
    executions: 145,
    status: "Active",
  },
  {
    id: 2,
    name: "NFT Monitor",
    type: "NFT",
    executions: 89,
    status: "Active",
  },
  {
    id: 3,
    name: "Portfolio Tracker",
    type: "Analytics",
    executions: 64,
    status: "Inactive",
  },
];

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Dashboard
          </h1>
          <p className="text-white/70">
            {publicKey ? (
              <>Connected: <span className="text-primary">{publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}</span></>
            ) : (
              "Connect your wallet to manage your agents"
            )}
          </p>
        </motion.div>

        {/* Dashboard Tabs */}
        <div className="mb-8 border-b border-white/10">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "overview"
                  ? "text-primary border-b-2 border-primary"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "myAgents"
                  ? "text-primary border-b-2 border-primary"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("myAgents")}
            >
              My Agents
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "settings"
                  ? "text-primary border-b-2 border-primary"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
        </div>

        {!publicKey ? (
          <div className="glass-panel p-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Wallet Not Connected</h3>
            <p className="text-white/70 mb-6">
              Connect your Solana wallet to manage your agents and see your dashboard.
            </p>
            <Button variant="primary">Connect Wallet</Button>
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    className="glass-panel p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-sm">Total Agents</p>
                        <h3 className="text-2xl font-bold text-white mt-1">3</h3>
                      </div>
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Users size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <span className="text-green-400">+2</span>
                      <span className="text-white/50 ml-1">this month</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="glass-panel p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-sm">Total Executions</p>
                        <h3 className="text-2xl font-bold text-white mt-1">298</h3>
                      </div>
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Zap size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <span className="text-green-400">+38</span>
                      <span className="text-white/50 ml-1">this week</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="glass-panel p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-sm">Active Agents</p>
                        <h3 className="text-2xl font-bold text-white mt-1">2</h3>
                      </div>
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Activity size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <span className="text-white/50">66% of total</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="glass-panel p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-sm">Earnings</p>
                        <h3 className="text-2xl font-bold text-white mt-1">12.5 SOL</h3>
                      </div>
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <Settings size={20} className="text-primary" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      <span className="text-green-400">+2.3 SOL</span>
                      <span className="text-white/50 ml-1">this month</span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="glass-panel p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-white mb-4">Weekly Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <XAxis dataKey="name" stroke="#ffffff50" />
                        <YAxis stroke="#ffffff50" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(10, 15, 29, 0.8)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: 'white' 
                          }} 
                        />
                        <Bar dataKey="executions" fill="#17E4A3" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === "myAgents" && (
              <div className="space-y-6">
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-white">Your Agents</h3>
                  <Button variant="primary" className="flex items-center gap-2">
                    <PlusCircle size={16} />
                    <span>Create New Agent</span>
                  </Button>
                </motion.div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="pb-3 pl-6 pr-4 text-white/70">Name</th>
                        <th className="pb-3 px-4 text-white/70">Type</th>
                        <th className="pb-3 px-4 text-white/70">Executions</th>
                        <th className="pb-3 px-4 text-white/70">Status</th>
                        <th className="pb-3 px-4 text-white/70">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAgents.map((agent) => (
                        <motion.tr 
                          key={agent.id}
                          className="border-b border-white/5 hover:bg-white/5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="py-4 pl-6 pr-4">
                            <div className="font-medium text-white">{agent.name}</div>
                          </td>
                          <td className="py-4 px-4 text-white/70">{agent.type}</td>
                          <td className="py-4 px-4 text-white/70">{agent.executions}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              agent.status === "Active" 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-red-500/20 text-red-400"
                            }`}>
                              {agent.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-white/70 hover:text-primary">
                                <Zap size={16} />
                              </button>
                              <button className="p-1 text-white/70 hover:text-primary">
                                <Settings size={16} />
                              </button>
                              <button className="p-1 text-white/70 hover:text-primary">
                                <Info size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <motion.div
                className="glass-panel p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-bold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white/70 mb-2">Wallet Address</label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={publicKey?.toString()} 
                        readOnly
                        className="flex-1 bg-glass-dark border border-white/10 rounded-lg py-2 px-4 text-white"
                      />
                      <Button variant="outline" className="ml-2">Copy</Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 mb-2">Notification Preferences</label>
                    <div className="space-y-2">
                      <label className="flex items-center justify-between glass-dark p-3 rounded-lg">
                        <span className="text-white">Email Notifications</span>
                        <input type="checkbox" className="toggle" />
                      </label>
                      <label className="flex items-center justify-between glass-dark p-3 rounded-lg">
                        <span className="text-white">Performance Reports</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between glass-dark p-3 rounded-lg">
                        <span className="text-white">Security Alerts</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 