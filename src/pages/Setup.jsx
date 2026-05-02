import React, { useState } from 'react';
import { Plus, X, GripVertical, ArrowRight, Check, Trash2, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import './Setup.css';

const defaultStages = [
  { id: 1, name: 'New Lead', color: '#6366f1' },
  { id: 2, name: 'Initial Contact', color: '#8b5cf6' },
  { id: 3, name: 'Needs Identified', color: '#a855f7' },
  { id: 4, name: 'Proposal Sent', color: '#d946ef' },
  { id: 5, name: 'Follow Up 1', color: '#ec4899' },
  { id: 6, name: 'Follow Up 2', color: '#f43f5e' },
  { id: 7, name: 'Demo Scheduled', color: '#f97316' },
  { id: 8, name: 'Demo Completed', color: '#f59e0b' },
  { id: 9, name: 'Quote Sent', color: '#eab308' },
  { id: 10, name: 'Negotiation', color: '#84cc16' },
  { id: 11, name: 'Meeting Booked', color: '#22c55e' },
  { id: 12, name: 'Contract Sent', color: '#10b981' },
  { id: 13, name: 'Payment Pending', color: '#14b8a6' },
  { id: 14, name: 'Payment Received', color: '#06b6d4' },
  { id: 15, name: 'Converted', color: '#22c55e' },
];

const SetupPage = () => {
  const [stages, setStages] = useState(defaultStages);
  const [savedStages, setSavedStages] = useState(defaultStages);
  const [newStageName, setNewStageName] = useState('');
  const [editingStage, setEditingStage] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleAddStage = () => {
    if (!newStageName.trim()) return;
    const newStage = {
      id: Date.now(),
      name: newStageName.trim(),
      color: '#6366f1'
    };
    setStages([...stages, newStage]);
    setNewStageName('');
  };

  const handleDeleteStage = (id) => {
    setStages(stages.filter(s => s.id !== id));
  };

  const handleUpdateStage = (id, name, color) => {
    setStages(stages.map(s => s.id === id ? { ...s, name, color } : s));
    setEditingStage(null);
  };

  const handleSave = () => {
    setSavedStages(stages);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setStages(savedStages);
  };

  const moveStage = (index, direction) => {
    const newStages = [...stages];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newStages.length) return;
    [newStages[index], newStages[targetIndex]] = [newStages[targetIndex], newStages[index]];
    setStages(newStages);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Setup" 
        description="Configure your CRM pipeline and tracking stages"
      />

      <div className="pipeline-visual">
        {savedStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="pipeline-stage-box">
              <div className="stage-box-color" style={{ background: stage.color }} />
              <span>{stage.name}</span>
            </div>
            {index < savedStages.length - 1 && (
              <div className="pipeline-arrow"><ArrowRight size={16} /></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="setup-content">
        <div className="setup-card">
          <div className="card-header">
            <h3>Sales Pipeline Stages</h3>
            <p>Define the stages your leads go through from creation to conversion</p>
          </div>

          <div className="stages-flow">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="stage-item">
                  <div className="stage-drag">
                    <GripVertical size={16} />
                  </div>
                  <div 
                    className="stage-color" 
                    style={{ background: stage.color }}
                  />
                  {editingStage === stage.id ? (
                    <div className="stage-edit-form">
                      <input 
                        type="text"
                        value={stage.name}
                        onChange={(e) => handleUpdateStage(stage.id, e.target.value, stage.color)}
                        autoFocus
                      />
                      <input 
                        type="color"
                        value={stage.color}
                        onChange={(e) => handleUpdateStage(stage.id, stage.name, e.target.value)}
                      />
                      <button onClick={() => setEditingStage(null)}>
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="stage-name"
                      onClick={() => setEditingStage(stage.id)}
                    >
                      {stage.name}
                    </span>
                  )}
                  <div className="stage-actions">
                    <button 
                      onClick={() => moveStage(index, -1)}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button 
                      onClick={() => moveStage(index, 1)}
                      disabled={index === stages.length - 1}
                    >
                      ↓
                    </button>
                    <button 
                      onClick={() => handleDeleteStage(stage.id)}
                      className="delete-btn"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div className="stage-connector">
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="add-stage-form">
            <input 
              type="text"
              placeholder="New stage name"
              value={newStageName}
              onChange={(e) => setNewStageName(e.target.value)}
            />
            <button onClick={handleAddStage}>
              <Plus size={16} /> Add Stage
            </button>
          </div>

<div className="form-actions">
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset Changes
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SetupPage;