import React, { useState } from 'react';
import { Plus, X, GripVertical, ArrowRight, Check, Trash2, Save } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { DEFAULT_STAGES } from '../constants';
import type { Stage } from '../types';
import '../../../pages/Setup.css';

const SetupPage = () => {
  const [stages, setStages] = useState<Stage[]>(DEFAULT_STAGES);
  const [savedStages, setSavedStages] = useState<Stage[]>(DEFAULT_STAGES);
  const [newStageName, setNewStageName] = useState('');
  const [editingStage, setEditingStage] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const handleAddStage = () => {
    if (!newStageName.trim()) return;
    const newStage: Stage = {
      id: Date.now(),
      name: newStageName.trim(),
      color: '#6366f1'
    };
    setStages([...stages, newStage]);
    setNewStageName('');
  };

  const handleDeleteStage = (id: number) => {
    setStages(stages.filter(s => s.id !== id));
  };

  const handleUpdateStage = (id: number, name: string, color: string) => {
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

  const moveStage = (index: number, direction: number) => {
    const newStages = [...stages];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newStages.length) return;
    const temp = newStages[index] as Stage;
    newStages[index] = newStages[targetIndex] as Stage;
    newStages[targetIndex] = temp;
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
