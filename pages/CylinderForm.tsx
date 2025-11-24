import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { SEO } from '../components/SEO';

export const CylinderForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // State for conditional inputs
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const toggleVisibility = (id: string, checked: boolean) => {
    setVisibility(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Prepare data object for submission
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    // Simulate API call / Submit to Formspree
    // Replace with actual endpoint from Layout.tsx logic if needed
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqanlwzb"; 

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setVisibility({}); // Reset conditional fields
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Hydraulic Cylinder Specification Form"
        description="Submit your technical requirements for custom hydraulic cylinder manufacturing. Detailed specification form for engineering quotes."
        keywords={['Hydraulic Cylinder Quote', 'Cylinder Specification', 'Custom Hydraulics Form']}
      />
      {/* Custom CSS based on the provided template */}
      <style>{`
        .cylinder-form-wrapper {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #01577d 0%, #003a52 100%);
            padding: 40px 20px;
            line-height: 1.6;
            color: #4b4b4b;
        }

        .form-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }

        .form-header {
            background: linear-gradient(135deg, #01577d 0%, #0a6a94 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .form-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            color: white !important;
        }

        .form-content {
            padding: 40px;
        }

        .form-section {
            margin-bottom: 40px;
            padding-bottom: 0px;
            border-bottom: 2px solid #ecf0f1;
        }

        .form-section:last-child {
            border-bottom: none;
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #01577d;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 3px solid #bc3636;
        }

        .hf-form-group {
            margin-bottom: 20px;
        }

        .hf-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4b4b4b;
            font-size: 14px;
        }

        .hf-input,
        .hf-textarea,
        .hf-select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ecf0f1;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .hf-input:focus,
        .hf-textarea:focus,
        .hf-select:focus {
            outline: none;
            border-color: #01577d;
            box-shadow: 0 0 0 3px rgba(1, 87, 125, 0.1);
        }

        .hf-textarea {
            min-height: 100px;
            resize: vertical;
        }

        .hf-checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 0px;
        }

        .hf-checkbox-item {
            display: flex;
            align-items: center;
            padding-left: 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
            padding-top: 8px;
            padding-bottom: 8px;
        }

        .hf-checkbox-item:hover {
            background: #f5f5f5;
        }

        input[type="checkbox"],
        input[type="radio"] {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            cursor: pointer;
            accent-color: #01577d;
        }

        .hf-inline-group {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .hf-range-group {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 15px;
            align-items: center;
        }

        .hf-submit-btn {
            background: linear-gradient(135deg, #01577d 0%, #0a6a94 100%);
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .hf-submit-btn:hover {
            background: linear-gradient(135deg, #bc3636 0%, #962a2a 100%);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(188, 54, 54, 0.3);
        }
        
        .hf-submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .nested-input {
            margin-left: 30px;
            margin-top: 10px;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .success-message {
            background: linear-gradient(135deg, #01577d 0%, #0a6a94 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(1, 87, 125, 0.2);
        }

        .error-message {
            background: linear-gradient(135deg, #bc3636 0%, #962a2a 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(188, 54, 54, 0.2);
        }
      `}</style>

      <div className="cylinder-form-wrapper">
        <div className="form-container">
          <div className="form-header">
            <h1>Hydraulic Cylinder Specification Form</h1>
          </div>

          <div className="form-content">
            
            {status === 'success' && (
                <div className="success-message">
                    ✓ Thank you! Your request has been successfully submitted.
                </div>
            )}

            {status === 'error' && (
                <div className="error-message">
                    ✕ An error occurred during submission. Please try again.
                </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div className="form-section">
                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">Company Name *</label>
                    <input type="text" className="hf-input" name="company" required />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">Contact Person *</label>
                    <input type="text" className="hf-input" name="contact_person" required />
                  </div>
                </div>
                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">Email *</label>
                    <input type="email" className="hf-input" name="email" required />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">Phone *</label>
                    <input type="tel" className="hf-input" name="phone" required />
                  </div>
                </div>
                <div className="hf-form-group">
                  <label className="hf-label">Date *</label>
                  <input type="date" className="hf-input" name="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                </div>
              </div>

              {/* 1. General Information */}
              <div className="form-section">
                <h2 className="section-title">1. General Information</h2>

                <div className="hf-form-group">
                  <label className="hf-label">1.1. Cylinder Application *</label>
                  <textarea className="hf-textarea" name="purpose" required placeholder="Application description, machine or mechanism type"></textarea>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">1.2. Cylinder Type *</label>
                  <div className="hf-checkbox-group">
                    {['Single Acting', 'Double Acting', 'Telescopic'].map(type => (
                        <div className="hf-checkbox-item" key={type}>
                            <input type="checkbox" name="cylinder_type" value={type.toLowerCase().replace(' ', '_')} id={`cyl_${type}`} />
                            <label htmlFor={`cyl_${type}`}>{type}</label>
                        </div>
                    ))}
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="cylinder_type" 
                        value="other" 
                        id="cylinder_other" 
                        onChange={(e) => toggleVisibility('cylinder_other', e.target.checked)}
                      />
                      <label htmlFor="cylinder_other">Other</label>
                    </div>
                    {visibility['cylinder_other'] && (
                      <div className="nested-input">
                        <input type="text" className="hf-input" name="cylinder_type_other" placeholder="Specify type" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">1.3. Working Fluid *</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="working_medium" value="hydraulic_oil" id="oil" />
                      <label htmlFor="oil">Hydraulic Oil</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="working_medium" value="water_glycol" id="glycol" />
                      <label htmlFor="glycol">Water-Glycol</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="working_medium" 
                        value="other" 
                        id="medium_other"
                        onChange={(e) => toggleVisibility('medium_other', e.target.checked)}
                      />
                      <label htmlFor="medium_other">Other</label>
                    </div>
                    {visibility['medium_other'] && (
                      <div className="nested-input">
                        <input type="text" className="hf-input" name="working_medium_other" placeholder="Specify fluid" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Technical Parameters */}
              <div className="form-section">
                <h2 className="section-title">2. Technical Parameters</h2>

                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">2.1. Working Pressure (bar) *</label>
                    <input type="number" className="hf-input" name="working_pressure" step="0.1" required />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">2.2. Maximum Pressure (bar) *</label>
                    <input type="number" className="hf-input" name="max_pressure" step="0.1" required />
                  </div>
                </div>

                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">2.3. Stroke Length (mm) *</label>
                    <input type="number" className="hf-input" name="stroke" required />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">2.4. Bore Diameter (mm) *</label>
                    <input type="number" className="hf-input" name="bore" required />
                  </div>
                </div>

                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">2.5. Rod Diameter (mm) *</label>
                    <input type="number" className="hf-input" name="rod" required />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">2.6. Closed Length (mm)</label>
                    <input type="number" className="hf-input" name="closed_length" />
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">2.7. Seal Type</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="seal_type" value="standard" id="seal_standard" />
                      <label htmlFor="seal_standard">Standard</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="seal_type" value="high_temp" id="seal_temp" />
                      <label htmlFor="seal_temp">High Temperature</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="seal_type" value="aggressive" id="seal_aggressive" />
                      <label htmlFor="seal_aggressive">For Aggressive Media</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="seal_type" 
                        value="other" 
                        id="seal_other" 
                        onChange={(e) => toggleVisibility('seal_other', e.target.checked)}
                      />
                      <label htmlFor="seal_other">Other</label>
                    </div>
                    {visibility['seal_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="seal_type_other" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">2.8. Operating Temperature Range</label>
                  <div className="hf-range-group">
                    <input type="number" className="hf-input" name="temp_from" placeholder="from °C" />
                    <span>to</span>
                    <input type="number" className="hf-input" name="temp_to" placeholder="to °C" />
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">2.9. Cylinder Operating Position</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="position" value="horizontal" id="pos_horizontal" />
                      <label htmlFor="pos_horizontal">Horizontal</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="position" value="vertical_up" id="pos_vert_up" />
                      <label htmlFor="pos_vert_up">Vertical (rod up)</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="position" value="vertical_down" id="pos_vert_down" />
                      <label htmlFor="pos_vert_down">Vertical (rod down)</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="position" 
                        value="other" 
                        id="pos_other"
                        onChange={(e) => toggleVisibility('pos_other', e.target.checked)}
                       />
                      <label htmlFor="pos_other">Other</label>
                    </div>
                    {visibility['pos_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="position_other" placeholder="Specify position" />
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Construction and Connections */}
              <div className="form-section">
                <h2 className="section-title">3. Construction and Connections</h2>

                <div className="hf-form-group">
                  <label className="hf-label">3.1. Body Mounting Type</label>
                  <div className="hf-checkbox-group">
                    {[
                        {id: 'front_flange', label: 'Front Flange'},
                        {id: 'rear_flange', label: 'Rear Flange'},
                        {id: 'lugs', label: 'Lugs (on body)'},
                        {id: 'pivot', label: 'Pivot Mount'}
                    ].map(item => (
                        <div className="hf-checkbox-item" key={item.id}>
                            <input type="checkbox" name="body_mount" value={item.id} id={`body_${item.id}`} />
                            <label htmlFor={`body_${item.id}`}>{item.label}</label>
                        </div>
                    ))}
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="body_mount" 
                        value="special" 
                        id="body_special" 
                        onChange={(e) => toggleVisibility('body_special', e.target.checked)}
                      />
                      <label htmlFor="body_special">Custom Design</label>
                    </div>
                    {visibility['body_special'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="body_mount_special" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">3.2. Rod Mounting Type</label>
                  <div className="hf-checkbox-group">
                    {['Threaded', 'Eye with Bushing', 'Fork', 'Sphere / Ball Joint'].map(type => {
                        const val = type.split(' ')[0].toLowerCase();
                        return (
                            <div className="hf-checkbox-item" key={val}>
                                <input type="checkbox" name="rod_mount" value={val} id={`rod_${val}`} />
                                <label htmlFor={`rod_${val}`}>{type}</label>
                            </div>
                        );
                    })}
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="rod_mount" 
                        value="other" 
                        id="rod_other"
                        onChange={(e) => toggleVisibility('rod_other', e.target.checked)}
                      />
                      <label htmlFor="rod_other">Other</label>
                    </div>
                    {visibility['rod_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="rod_mount_other" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">3.3. Port Type (Connections)</label>
                  <div className="hf-checkbox-group">
                    {['BSP', 'Metric', 'ORFS', 'SAE'].map(type => (
                        <div className="hf-checkbox-item" key={type}>
                            <input type="checkbox" name="port_type" value={type.toLowerCase()} id={`port_${type}`} />
                            <label htmlFor={`port_${type}`}>{type}</label>
                        </div>
                    ))}
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="port_type" 
                        value="other" 
                        id="port_other" 
                        onChange={(e) => toggleVisibility('port_other', e.target.checked)}
                      />
                      <label htmlFor="port_other">Other</label>
                    </div>
                    {visibility['port_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="port_type_other" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">3.4. Port Position</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="port_position" value="standard" id="port_pos_std" />
                      <label htmlFor="port_pos_std">Standard</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="port_position" 
                        value="custom" 
                        id="port_pos_custom"
                        onChange={(e) => toggleVisibility('port_pos_custom', e.target.checked)}
                       />
                      <label htmlFor="port_pos_custom">Per Drawing / Custom</label>
                    </div>
                    {visibility['port_pos_custom'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="port_position_custom" placeholder="Specify requirements" />
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. Operating Conditions */}
              <div className="form-section">
                <h2 className="section-title">4. Operating Conditions</h2>

                <div className="hf-form-group">
                  <label className="hf-label">4.1. Duty Cycle (load, frequency, speed)</label>
                  <textarea className="hf-textarea" name="work_cycle" placeholder="Describe duty cycle"></textarea>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">4.2. Maximum Load / Force</label>
                  <div className="hf-inline-group">
                    <input type="number" className="hf-input" name="force_push" placeholder="Push Force (kN)" step="0.1" />
                    <input type="number" className="hf-input" name="force_pull" placeholder="Pull Force (kN)" step="0.1" />
                  </div>
                </div>

                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">4.3. Rod Speed (mm/s)</label>
                    <input type="number" className="hf-input" name="rod_speed" step="0.1" />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">4.4. Cycle Frequency (per minute / hour)</label>
                    <input type="text" className="hf-input" name="cycle_frequency" />
                  </div>
                </div>
              </div>

              {/* 5. Materials and Coating */}
              <div className="form-section">
                <h2 className="section-title">5. Materials and Coating</h2>

                <div className="hf-form-group">
                  <label className="hf-label">5.1. Cylinder Material</label>
                  <div className="hf-checkbox-group">
                    {['Steel', 'Stainless Steel', 'Aluminum'].map(mat => (
                         <div className="hf-checkbox-item" key={mat}>
                            <input type="checkbox" name="cylinder_material" value={mat.toLowerCase().split(' ')[0]} id={`cyl_${mat.toLowerCase().split(' ')[0]}`} />
                            <label htmlFor={`cyl_${mat.toLowerCase().split(' ')[0]}`}>{mat}</label>
                         </div>
                    ))}
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="cylinder_material" 
                        value="other" 
                        id="cyl_other"
                        onChange={(e) => toggleVisibility('cyl_other', e.target.checked)}
                       />
                      <label htmlFor="cyl_other">Other</label>
                    </div>
                    {visibility['cyl_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="cylinder_material_other" placeholder="Material grade" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">5.2. Rod Material</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="rod_material" value="chrome" id="rod_chrome" />
                      <label htmlFor="rod_chrome">Chrome-Plated Steel</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="rod_material" value="induction" id="rod_induction" />
                      <label htmlFor="rod_induction">Induction Hardened</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="rod_material" value="stainless" id="rod_stainless" />
                      <label htmlFor="rod_stainless">Stainless Steel</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="rod_material" 
                        value="other" 
                        id="rod_mat_other" 
                        onChange={(e) => toggleVisibility('rod_mat_other', e.target.checked)}
                      />
                      <label htmlFor="rod_mat_other">Other</label>
                    </div>
                    {visibility['rod_mat_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="rod_material_other" placeholder="Material grade" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">5.3. Protective Coating</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="coating" value="none" id="coating_none" />
                      <label htmlFor="coating_none">No Coating</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="coating" 
                        value="paint" 
                        id="coating_paint" 
                        onChange={(e) => toggleVisibility('coating_paint', e.target.checked)}
                      />
                      <label htmlFor="coating_paint">Paint</label>
                    </div>
                    {visibility['coating_paint'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="coating_ral" placeholder="RAL" />
                        </div>
                    )}
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="coating" value="zinc" id="coating_zinc" />
                      <label htmlFor="coating_zinc">Zinc Plating</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="coating" value="nickel" id="coating_nickel" />
                      <label htmlFor="coating_nickel">Nickel Plating</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="coating" 
                        value="other" 
                        id="coating_other"
                        onChange={(e) => toggleVisibility('coating_other', e.target.checked)}
                      />
                      <label htmlFor="coating_other">Other</label>
                    </div>
                    {visibility['coating_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="coating_other_text" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 6. Additional Requirements */}
              <div className="form-section">
                <h2 className="section-title">6. Additional Requirements</h2>

                <div className="hf-form-group">
                  <label className="hf-label">6.1. Position Sensors / Limit Switches</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="sensors" value="no" id="sensors_no" />
                      <label htmlFor="sensors_no">No</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="sensors" 
                        value="yes" 
                        id="sensors_yes"
                        onChange={(e) => toggleVisibility('sensors_yes', e.target.checked)}
                      />
                      <label htmlFor="sensors_yes">Yes</label>
                    </div>
                    {visibility['sensors_yes'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="sensors_type" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">6.2. Built-in Valves</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="valves" value="no" id="valves_no" />
                      <label htmlFor="valves_no">No</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="valves" value="relief" id="valves_relief" />
                      <label htmlFor="valves_relief">Relief Valve</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="valves" value="check" id="valves_check" />
                      <label htmlFor="valves_check">Check Valve</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="valves" value="throttle" id="valves_throttle" />
                      <label htmlFor="valves_throttle">Throttle Valve</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input 
                        type="checkbox" 
                        name="valves" 
                        value="other" 
                        id="valves_other" 
                        onChange={(e) => toggleVisibility('valves_other', e.target.checked)}
                      />
                      <label htmlFor="valves_other">Other</label>
                    </div>
                    {visibility['valves_other'] && (
                        <div className="nested-input">
                            <input type="text" className="hf-input" name="valves_other_text" placeholder="Specify type" />
                        </div>
                    )}
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">6.3. Special Requirements</label>
                  <textarea className="hf-textarea" name="special_requirements" placeholder="For example: CE certification, ATEX, marine environment, etc."></textarea>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">6.4. 3D Model / Drawing Required for Approval</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="model_required" value="yes" id="model_yes" />
                      <label htmlFor="model_yes">Yes</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="model_required" value="no" id="model_no" />
                      <label htmlFor="model_no">No</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Logistics and Packaging */}
              <div className="form-section">
                <h2 className="section-title">7. Logistics and Packaging</h2>

                <div className="hf-inline-group">
                  <div className="hf-form-group">
                    <label className="hf-label">7.1. Quantity (pcs) *</label>
                    <input type="number" className="hf-input" name="quantity" required min="1" />
                  </div>
                  <div className="hf-form-group">
                    <label className="hf-label">7.2. Required Delivery Time</label>
                    <input type="text" className="hf-input" name="delivery_time" />
                  </div>
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">7.3. Delivery Terms (Incoterms)</label>
                  <input type="text" className="hf-input" name="incoterms" placeholder="EXW, FCA, DAP, etc." />
                </div>

                <div className="hf-form-group">
                  <label className="hf-label">7.4. Packaging Method</label>
                  <div className="hf-checkbox-group">
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="packaging" value="standard" id="pack_standard" />
                      <label htmlFor="pack_standard">Standard</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="packaging" value="individual" id="pack_individual" />
                      <label htmlFor="pack_individual">Individual / Export Packaging</label>
                    </div>
                    <div className="hf-checkbox-item">
                      <input type="checkbox" name="packaging" value="custom" id="pack_custom" />
                      <label htmlFor="pack_custom">Per Customer Requirements</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. Additional Information */}
              <div className="form-section">
                <h2 className="section-title">8. Additional Information</h2>

                <div className="hf-form-group">
                  <label className="hf-label">Any drawings, schematics, photos or reference examples</label>
                  <textarea className="hf-textarea" name="additional_info" rows={5} placeholder="Additional comments or links to files"></textarea>
                </div>
              </div>

              <button type="submit" className="hf-submit-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};