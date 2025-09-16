import React, { useState } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import './SetupWizard.css';

const portfolioTemplates = {
  conservative: {
    name: 'Conservative',
    description: 'Lower risk, stable returns',
    allocation: {
      stocks: 30,
      bonds: 50,
      realEstate: 10,
      cash: 10
    },
    riskTolerance: 'low',
    investmentStrategy: 'income'
  },
  moderate: {
    name: 'Moderate',
    description: 'Balanced risk and returns',
    allocation: {
      stocks: 50,
      bonds: 30,
      realEstate: 15,
      cash: 5
    },
    riskTolerance: 'moderate',
    investmentStrategy: 'balanced'
  },
  aggressive: {
    name: 'Aggressive Growth',
    description: 'Higher risk, potential for higher returns',
    allocation: {
      stocks: 70,
      bonds: 15,
      realEstate: 10,
      cash: 5
    },
    riskTolerance: 'high',
    investmentStrategy: 'growth'
  }
};

const SetupWizard = ({ userId, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    initialInvestment: 0,
    monthlyContribution: 0,
    template: 'moderate'
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData(prev => ({ ...prev, template }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('monthly') || name.includes('initial') ? 
              parseFloat(value) : value
    }));
  };

  const applyTemplate = async () => {
    const db = getFirestore();
    const template = portfolioTemplates[formData.template];
    const totalBalance = formData.initialInvestment;
    
    try {
      // Update user profile
      await updateDoc(doc(db, `users/${userId}/profile`), {
        name: formData.name,
        setupComplete: true
      });

      // Update portfolio summary
      await updateDoc(doc(db, `users/${userId}/portfolio/summary`), {
        totalBalance: totalBalance,
        totalInvestments: totalBalance * 0.95, // Reserve 5% as cash
        availableCash: totalBalance * 0.05,
        name: formData.name
      });

      // Update asset allocation based on template
      const allocation = template.allocation;
      await updateDoc(doc(db, `users/${userId}/allocation/current`), {
        stocks: totalBalance * (allocation.stocks / 100),
        bonds: totalBalance * (allocation.bonds / 100),
        realEstate: totalBalance * (allocation.realEstate / 100),
        cash: totalBalance * (allocation.cash / 100),
        totalValue: totalBalance
      });

      // Update user preferences
      await updateDoc(doc(db, `users/${userId}/settings/preferences`), {
        riskTolerance: template.riskTolerance,
        investmentStrategy: template.investmentStrategy,
        monthlyContribution: formData.monthlyContribution
      });

      onComplete();
    } catch (error) {
      console.error('Error applying template:', error);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="wizard-step">
            <h2>Welcome! Let's set up your portfolio</h2>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <button onClick={() => setStep(2)}>Next</button>
          </div>
        );
      
      case 2:
        return (
          <div className="wizard-step">
            <h2>Investment Profile</h2>
            <div className="form-group">
              <label>Initial Investment ($)</label>
              <input
                type="number"
                name="initialInvestment"
                value={formData.initialInvestment}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>Monthly Contribution ($)</label>
              <input
                type="number"
                name="monthlyContribution"
                value={formData.monthlyContribution}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        );
      
      case 3:
        return (
          <div className="wizard-step">
            <h2>Choose Your Investment Strategy</h2>
            <div className="template-grid">
              {Object.entries(portfolioTemplates).map(([key, template]) => (
                <div
                  key={key}
                  className={`template-card ${selectedTemplate === key ? 'selected' : ''}`}
                  onClick={() => handleTemplateSelect(key)}
                >
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <div className="allocation-chart">
                    {Object.entries(template.allocation).map(([asset, percentage]) => (
                      <div key={asset} className="allocation-bar">
                        <div className="allocation-label">{asset}</div>
                        <div className="allocation-value">{percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={applyTemplate}>Complete Setup</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="setup-wizard">
      <div className="wizard-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      {renderStep()}
    </div>
  );
};

export default SetupWizard;
