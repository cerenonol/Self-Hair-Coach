import React, { useEffect, useState } from 'react';
import { AIAgent } from '../types';
import Icon from '../../../components/AppIcon';

interface AIAgentHUDProps {
  agents: AIAgent[];
  onAllAgentsActive: () => void;
  isCapturing: boolean;
  className?: string;
}

const AIAgentHUD = ({ agents, onAllAgentsActive, isCapturing, className = '' }: AIAgentHUDProps) => {
  const [localAgents, setLocalAgents] = useState<AIAgent[]>(agents);

  useEffect(() => {
    if (isCapturing) return;

    const simulateAIProgress = () => {
      const delays = [1000, 2000, 3500, 4500]; // Staggered activation times
      
      delays.forEach((delay, index) => {
        setTimeout(() => {
          setLocalAgents(prev => 
            prev.map((agent, i) => 
              i === index 
                ? { ...agent, status: 'processing' as const }
                : agent
            )
          );
          
          // Activate after processing
          setTimeout(() => {
            setLocalAgents(prev => 
              prev.map((agent, i) => 
                i === index 
                  ? { ...agent, status: 'active' as const }
                  : agent
              )
            );
            
            // Check if all agents are active
            if (index === delays.length - 1) {
              setTimeout(() => {
                onAllAgentsActive();
              }, 500);
            }
          }, 800);
        }, delay);
      });
    };

    // Reset agents and start simulation
    setLocalAgents(agents.map(agent => ({ ...agent, status: 'inactive' as const })));
    simulateAIProgress();
  }, [agents, onAllAgentsActive, isCapturing]);

  const getAgentIcon = (agent: AIAgent) => {
    switch (agent.id) {
      case 'vision':
        return 'Eye';
      case 'pose':
        return 'Move3D';
      case 'lighting':
        return 'Lightbulb';
      case 'quality':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status: AIAgent['status']) => {
    switch (status) {
      case 'active':
        return 'var(--color-success)';
      case 'processing':
        return 'var(--color-warning)';
      case 'inactive':
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBackground = (status: AIAgent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success/20 border-success/40';
      case 'processing':
        return 'bg-warning/20 border-warning/40';
      case 'inactive':
      default:
        return 'bg-muted/20 border-muted/40';
    }
  };

  return (
    <div className={`bg-black/60 backdrop-blur-sm rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-sm font-medium">AI Analiz Sistemi</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
          <span className="text-success text-xs font-mono">Aktif</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {localAgents.map((agent) => (
          <div
            key={agent.id}
            className={`
              relative p-3 rounded-lg border transition-all duration-500
              ${getStatusBackground(agent.status)}
              ${agent.status === 'processing' ? 'animate-pulse' : ''}
            `}
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Icon
                  name={getAgentIcon(agent)}
                  size={20}
                  color={getStatusColor(agent.status)}
                  className={agent.status === 'processing' ? 'animate-spin' : ''}
                />
                {agent.status === 'active' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-black">
                    <Icon name="Check" size={8} color="white" className="absolute inset-0" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">
                  {agent.name}
                </p>
                <p className="text-white/60 text-xs truncate">
                  {agent.status === 'active' ? 'Hazır' : 
                   agent.status === 'processing' ? 'Analiz ediliyor...' : 'Bekliyor'}
                </p>
              </div>
            </div>

            {/* Processing Animation */}
            {agent.status === 'processing' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-warning/20 overflow-hidden">
                <div className="h-full bg-warning animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overall Status */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-xs">
            Genel Durum
          </span>
          <span className={`text-xs font-medium ${
            localAgents.every(agent => agent.status === 'active')
              ? 'text-success' :'text-warning'
          }`}>
            {localAgents.every(agent => agent.status === 'active')
              ? 'Fotoğraf çekime hazır'
              : `${localAgents.filter(agent => agent.status === 'active').length}/${localAgents.length} tamamlandı`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIAgentHUD;