import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { ArrowLeft, Save, Play, MessageSquare, Type } from 'lucide-react';
import ChatPreview from '../components/ChatPreview';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Builder() {
  const { botId } = useParams();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchFlow = async () => {
      try {
        const res = await fetch(`/api/flows/${botId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.nodes) setNodes(data.nodes);
          if (data.edges) setEdges(data.edges);
          
          // Update ID counter based on existing nodes
          if (data.nodes && data.nodes.length > 0) {
            const maxId = Math.max(...data.nodes.map((n: any) => {
              const match = n.id.match(/dndnode_(\d+)/);
              return match ? parseInt(match[1]) : 0;
            }));
            id = maxId + 1;
          }
        }
      } catch (error) {
        console.error('Failed to fetch flow', error);
      }
    };
    fetchFlow();
  }, [botId, token, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node = {
        id: getId(),
        type: 'default', // We use default node type but store our custom type in data
        position,
        data: { 
          label: type === 'message' ? 'Message Node' : 'Input Node',
          type: type,
          text: type === 'message' ? 'Hello!' : '',
          variable: type === 'input' ? 'name' : ''
        },
        style: {
          background: '#1A1D24',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  const updateNodeData = (key: string, value: string) => {
    if (!selectedNode) return;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              [key]: value,
              label: key === 'text' && node.data.type === 'message' ? value : 
                     key === 'variable' && node.data.type === 'input' ? `Input: ${value}` : node.data.label
            },
          };
          setSelectedNode(updatedNode);
          return updatedNode;
        }
        return node;
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/flows/${botId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nodes, edges })
      });
      if (!res.ok) throw new Error('Failed to save');
      alert('Saved successfully!');
    } catch (error) {
      console.error('Save error', error);
      alert('Failed to save flow');
    } finally {
      setIsSaving(false);
    }
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="h-screen flex flex-col bg-[#0B0F19] text-white font-sans overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0B0F19]/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-medium text-slate-200">Bot Builder</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Flow'}
          </button>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff8a00] to-[#e52e71] text-white text-sm font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(255,138,0,0.3)] hover:shadow-[0_0_25px_rgba(255,138,0,0.5)] transition-all"
          >
            <Play className="w-4 h-4" />
            Test Bot
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Cinematic Background Layers for Canvas */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full mix-blend-screen"></div>
        </div>

        {/* Left Sidebar - Nodes */}
        <div className="w-72 border-r border-white/10 bg-[#1A1D24]/60 backdrop-blur-xl p-6 flex flex-col gap-6 z-10">
          <div>
            <h3 className="font-medium text-xs text-slate-500 uppercase tracking-wider mb-4">Available Nodes</h3>
            <p className="text-sm text-slate-400 font-light mb-6">Drag and drop nodes onto the canvas to build your bot's flow.</p>
          </div>
          
          <div className="space-y-3">
            <div 
              className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-grab hover:bg-white/10 hover:border-orange-500/30 transition-all flex items-center gap-4 group"
              onDragStart={(event) => onDragStart(event, 'message')}
              draggable
            >
              <div className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/20 p-2.5 rounded-lg text-orange-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-medium text-slate-200 block">Message</span>
                <span className="text-xs text-slate-500 font-light">Send text to user</span>
              </div>
            </div>

            <div 
              className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-grab hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center gap-4 group"
              onDragStart={(event) => onDragStart(event, 'input')}
              draggable
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 p-2.5 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <span className="font-medium text-slate-200 block">User Input</span>
                <span className="text-xs text-slate-500 font-light">Wait for response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 relative z-10" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              fitView
              colorMode="dark"
              className="bg-transparent"
            >
              <Controls className="bg-[#1A1D24] border-white/10 fill-white" />
              <Background color="#ffffff" gap={24} size={1} opacity={0.05} />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* Right Sidebar - Settings */}
        {selectedNode && (
          <div className="w-80 border-l border-white/10 bg-[#1A1D24]/80 backdrop-blur-xl p-6 flex flex-col gap-8 shadow-[-20px_0_40px_rgba(0,0,0,0.3)] z-20 animate-in slide-in-from-right-8">
            <div>
              <h2 className="text-lg font-medium text-slate-200">Node Settings</h2>
              <p className="text-sm text-slate-500 font-light capitalize mt-1">{selectedNode.data.type} Node Configuration</p>
            </div>

            {selectedNode.data.type === 'message' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Message Text</label>
                  <textarea 
                    value={selectedNode.data.text as string} 
                    onChange={(e) => updateNodeData('text', e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all font-light min-h-[120px] resize-none"
                  />
                </div>
              </div>
            )}

            {selectedNode.data.type === 'input' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Variable Name</label>
                  <input 
                    value={selectedNode.data.variable as string} 
                    onChange={(e) => updateNodeData('variable', e.target.value)}
                    placeholder="e.g., user_name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-light"
                  />
                  <p className="text-xs text-slate-500 font-light ml-1 mt-2">The user's response will be stored in this variable.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Preview Modal/Sidebar */}
      {isChatOpen && (
        <ChatPreview 
          nodes={nodes} 
          edges={edges} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </div>
  );
}
