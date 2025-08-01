import React from 'react';
import './styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MaintenanceForm = () => {
  const { unitId } = useParams();
  const [forkliftData, setForkliftData] = useState({});

useEffect(() => {
  if (!unitId) return;

  fetch(`/api/forklifts/${unitId}`)
    .then(res => res.json())
    .then(data => {
      setForkliftData({
        id: data.id || '',
        customerName: data.customerName || '',
        address: data.customerAddress || '',
        city: data.customerCity || '',
        state: data.customerState || '',
        customerPO: '',
        unitId: data.unitId || '',
        make: data.make || '',
        model: data.model || '',
        serialNumber: data.serialNumber || '',
        hourMeter: data.hourMeter || ''
      });
    })
    .catch(err => console.error('Failed to fetch forklift data:', err));
}, [unitId]);


    
const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;

  const inspectionData = {};

  // Collect selected radio buttons
  const radios = form.querySelectorAll('input[type="radio"]:checked');
  radios.forEach((input) => {
    inspectionData[input.name] = input.value;
  });

  const formData = {
    customerName: form.customer_name.value,
    customerPO: form.customer_po.value,
    address: form.address.value,
    city: form.city.value,
    state: form.state.value,
    unitId: form.unit_number.value,
    make: form.make.value,
    model: form.model.value,
    serialNumber: form.serial_number.value,
    hourMeter: form.hour_meter.value,
    dateStarted: form.date_started.value,
    dateCompleted: form.date_completed.value,
    description: 'Maintenance form submitted via frontend.',
    technicianComments: form.technician_comments.value,
    technicianSignature: form.technician_signature.value,
    inspectionData: inspectionData,
    forkliftId: forkliftData.id,
    technicianId: parseInt(localStorage.getItem('userId'))
  };


  // Collect text, date, and textarea inputs
  const inputs = form.querySelectorAll('input[type="text"]:not([readonly]), input[type="date"]:not([readonly]), textarea');

  inputs.forEach((input) => {
    formData[input.name] = input.value;
  });

  formData.inspection_data = inspectionData;

  try {

    const response = await fetch('/api/maintenance/form', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Form submitted successfully.');
      form.reset();
    } else {
      alert('Error submitting form.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Network or server error occurred.');
  }
};
return (
  <div className="form-container">
    <div className="header-container">
      <h1>ManageLift</h1>
      <h2>Maintenance Checklist</h2>
    </div>

<form id="maintenanceForm" onSubmit={handleSubmit}>
  <div className="info-grid">
    <div className="form-group">
      <label>Customer Name</label>
      <input type="text" name="customer_name" readOnly defaultValue={forkliftData.customerName || ''} />
    </div>

    <div className="form-group">
      <label>Address</label>
      <input type="text" name="address" readOnly defaultValue={forkliftData.address || ''} />
    </div>

    <div className="form-group">
      <label>City</label>
      <input type="text" name="city" readOnly defaultValue={forkliftData.city || ''} />
    </div>

    <div className="form-group">
      <label>State</label>
      <input type="text" name="state" readOnly defaultValue={forkliftData.state || ''} />
    </div>

    <div className="form-group">
        <label>Customer PO</label>
        <input type="text" name="customer_po" />
    </div>


    <div className="form-group">
      <label>Date Started</label>
      <input type="date" name="date_started" />
    </div>

    <div className="form-group">
      <label>Date Completed</label>
      <input type="date" name="date_completed" />
    </div>

    <div className="form-group">
      <label>Unit ID#</label>
      <input type="text" name="unit_number" readOnly defaultValue={forkliftData.unitId || ''} />
    </div>

    <div className="form-group">
      <label>Make</label>
      <input type="text" name="make" readOnly defaultValue={forkliftData.make || ''} />
    </div>

    <div className="form-group">
      <label>Model</label>
      <input type="text" name="model" readOnly defaultValue={forkliftData.model || ''} />
    </div>

    <div className="form-group">
      <label>Serial Number</label>
      <input type="text" name="serial_number" readOnly defaultValue={forkliftData.serialNumber || ''} />
    </div>

    <div className="form-group">
      <label>Hour Meter</label>
      <input type="text" name="hour_meter" readOnly defaultValue={forkliftData.hourMeter || ''} />
    </div>
  </div>



      <div className="pfn-legend">
        <strong>Legend:</strong> <span>P = Pass</span>, <span>F = Fail</span>, <span>N = Not Applicable</span>
      </div>


      <div className="side-by-side-section">
        <div className="section">
          <h3>1. Visual Inspection</h3>
          <div className="inspection-header">
            <span>P</span><span>F</span><span>N</span><span></span>
          </div>

          <div className="inspection-row">
            <input type="radio" name="fluid_leaks" value="P" required />
            <input type="radio" name="fluid_leaks" value="F" />
            <input type="radio" name="fluid_leaks" value="N" />
            <label>Fluid Leaks</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="carriage_rollers_slide_blocks" value="P" required />
            <input type="radio" name="carriage_rollers_slide_blocks" value="F" />
            <input type="radio" name="carriage_rollers_slide_blocks" value="N" />
            <label>Carriage Rollers / Slide Blocks</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="mast_chains_retainers_sheaves_anchors" value="P" required />
            <input type="radio" name="mast_chains_retainers_sheaves_anchors" value="F" />
            <input type="radio" name="mast_chains_retainers_sheaves_anchors" value="N" />
            <label>Mast – Chains / Retainers / Sheaves / Anchors</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="forks_and_fork_lock_pins" value="P" required />
            <input type="radio" name="forks_and_fork_lock_pins" value="F" />
            <input type="radio" name="forks_and_fork_lock_pins" value="N" />
            <label>Forks and Fork Lock Pins</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="hydraulic_cylinders" value="P" required />
            <input type="radio" name="hydraulic_cylinders" value="F" />
            <input type="radio" name="hydraulic_cylinders" value="N" />
            <label>Hydraulic Cylinders</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="brake_master_cylinder" value="P" required />
            <input type="radio" name="brake_master_cylinder" value="F" />
            <input type="radio" name="brake_master_cylinder" value="N" />
            <label>Brake Master Cylinder</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="over_mast_hoses_and_cables" value="P" required />
            <input type="radio" name="over_mast_hoses_and_cables" value="F" />
            <input type="radio" name="over_mast_hoses_and_cables" value="N" />
            <label>Over Mast Hoses and Cables</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="caster_assembly" value="P" required />
            <input type="radio" name="caster_assembly" value="F" />
            <input type="radio" name="caster_assembly" value="N" />
            <label>Caster Assembly</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="drive_unit_radial_rings" value="P" required />
            <input type="radio" name="drive_unit_radial_rings" value="F" />
            <input type="radio" name="drive_unit_radial_rings" value="N" />
            <label>Drive Unit / Radial Rings</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="hydraulic_manifold_piping" value="P" required />
            <input type="radio" name="hydraulic_manifold_piping" value="F" />
            <input type="radio" name="hydraulic_manifold_piping" value="N" />
            <label>Hydraulic Manifold / Piping</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="tractor_frame_base_legs_doors_and_covers" value="P" required />
            <input type="radio" name="tractor_frame_base_legs_doors_and_covers" value="F" />
            <input type="radio" name="tractor_frame_base_legs_doors_and_covers" value="N" />
            <label>Tractor Frame / Base Legs / Doors & Covers</label>
          </div>
        </div>

        {/* 2. Hydraulic System */}
        <div className="section">
          <h3>2. Hydraulic System</h3>
          <div className="inspection-header">
            <span>P</span><span>F</span><span>N</span><span></span>
          </div>

          <div className="inspection-row">
            <input type="radio" name="lift_cyl" value="P" required />
            <input type="radio" name="lift_cyl" value="F" />
            <input type="radio" name="lift_cyl" value="N" />
            <label>Lift Cyl.</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="reach_cyl" value="P" required />
            <input type="radio" name="reach_cyl" value="F" />
            <input type="radio" name="reach_cyl" value="N" />
            <label>Reach Cyl.</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="tilt_cyl" value="P" required />
            <input type="radio" name="tilt_cyl" value="F" />
            <input type="radio" name="tilt_cyl" value="N" />
            <label>Tilt Cyl.</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="sideshift_cyl" value="P" required />
            <input type="radio" name="sideshift_cyl" value="F" />
            <input type="radio" name="sideshift_cyl" value="N" />
            <label>Sideshift Cyl.</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="connections" value="P" required />
            <input type="radio" name="connections" value="F" />
            <input type="radio" name="connections" value="N" />
            <label>Connections</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="relief_pressures" value="P" required />
            <input type="radio" name="relief_pressures" value="F" />
            <input type="radio" name="relief_pressures" value="N" />
            <label>Relief Pressures</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="lift" value="P" required />
            <input type="radio" name="lift" value="F" />
            <input type="radio" name="lift" value="N" />
            <label>Lift</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="aux" value="P" required />
            <input type="radio" name="aux" value="F" />
            <input type="radio" name="aux" value="N" />
            <label>Aux</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="steer" value="P" required />
            <input type="radio" name="steer" value="F" />
            <input type="radio" name="steer" value="N" />
            <label>Steer</label>
          </div>
        </div>

        {/* 3. Electrical System */}
        <div className="section">
          <h3>3. Electrical System</h3>
          <div className="inspection-header">
            <span>P</span><span>F</span><span>N</span><span></span>
          </div>

          <div className="inspection-row">
            <input type="radio" name="control_wiring" value="P" required />
            <input type="radio" name="control_wiring" value="F" />
            <input type="radio" name="control_wiring" value="N" />
            <label>Control Wiring</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="switches" value="P" required />
            <input type="radio" name="switches" value="F" />
            <input type="radio" name="switches" value="N" />
            <label>Switches</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="contactors" value="P" required />
            <input type="radio" name="contactors" value="F" />
            <input type="radio" name="contactors" value="N" />
            <label>Contactors</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="power_cables" value="P" required />
            <input type="radio" name="power_cables" value="F" />
            <input type="radio" name="power_cables" value="N" />
            <label>Power Cables</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="fuses" value="P" required />
            <input type="radio" name="fuses" value="F" />
            <input type="radio" name="fuses" value="N" />
            <label>Fuses</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="connectors" value="P" required />
            <input type="radio" name="connectors" value="F" />
            <input type="radio" name="connectors" value="N" />
            <label>Connectors</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="system_short_to_frame" value="P" required />
            <input type="radio" name="system_short_to_frame" value="F" />
            <input type="radio" name="system_short_to_frame" value="N" />
            <label>System Short to Frame</label>
          </div>
        </div>

        {/* 4. Motors and 5. Battery */}
        <div className="motor-battery-section">
          <div className="motor-section">
            <div className="section">
              <div className="motor-heading-wrapper">
                <h3>4. Motors</h3>
              </div>
              <div className="inspection-header">
                <h4 className="motor-drive-header">Drive</h4>
              </div>

              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row">
                <input type="radio" name="drive_brushes" value="P" required />
                <input type="radio" name="drive_brushes" value="F" />
                <input type="radio" name="drive_brushes" value="N" />
                <label>Brushes</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="drive_comm" value="P" required />
                <input type="radio" name="drive_comm" value="F" />
                <input type="radio" name="drive_comm" value="N" />
                <label>Comm</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="drive_amps" value="P" required />
                <input type="radio" name="drive_amps" value="F" />
                <input type="radio" name="drive_amps" value="N" />
                <label>Amps</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="drive_ohms" value="P" required />
                <input type="radio" name="drive_ohms" value="F" />
                <input type="radio" name="drive_ohms" value="N" />
                <label>Ohms</label>
              </div>
            </div>

            {/* Lift */}
            <div className="section">
              <h4 className="motor-sub-header">Lift</h4>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row">
                <input type="radio" name="lift_brushes" value="P" required />
                <input type="radio" name="lift_brushes" value="F" />
                <input type="radio" name="lift_brushes" value="N" />
                <label>Brushes</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="lift_comm" value="P" required />
                <input type="radio" name="lift_comm" value="F" />
                <input type="radio" name="lift_comm" value="N" />
                <label>Comm</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="lift_amps" value="P" required />
                <input type="radio" name="lift_amps" value="F" />
                <input type="radio" name="lift_amps" value="N" />
                <label>Amps</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="lift_ohms" value="P" required />
                <input type="radio" name="lift_ohms" value="F" />
                <input type="radio" name="lift_ohms" value="N" />
                <label>Ohms</label>
              </div>
            </div>

            {/* Aux */}
            <div className="section">
              <h4 className="motor-sub-header">Aux</h4>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row">
                <input type="radio" name="aux_brushes" value="P" required />
                <input type="radio" name="aux_brushes" value="F" />
                <input type="radio" name="aux_brushes" value="N" />
                <label>Brushes</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="aux_comm" value="P" required />
                <input type="radio" name="aux_comm" value="F" />
                <input type="radio" name="aux_comm" value="N" />
                <label>Comm</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="aux_amps" value="P" required />
                <input type="radio" name="aux_amps" value="F" />
                <input type="radio" name="aux_amps" value="N" />
                <label>Amps</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="aux_ohms" value="P" required />
                <input type="radio" name="aux_ohms" value="F" />
                <input type="radio" name="aux_ohms" value="N" />
                <label>Ohms</label>
              </div>
            </div>

            {/* Steer  */}
            <div className="section">
              <h4 className="motor-sub-header">Steer</h4>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row">
                <input type="radio" name="steer_brushes" value="P" required />
                <input type="radio" name="steer_brushes" value="F" />
                <input type="radio" name="steer_brushes" value="N" />
                <label>Brushes</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="steer_comm" value="P" required />
                <input type="radio" name="steer_comm" value="F" />
                <input type="radio" name="steer_comm" value="N" />
                <label>Comm</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="steer_amps" value="P" required />
                <input type="radio" name="steer_amps" value="F" />
                <input type="radio" name="steer_amps" value="N" />
                <label>Amps</label>
              </div>
              <div className="inspection-row">
                <input type="radio" name="steer_ohms" value="P" required />
                <input type="radio" name="steer_ohms" value="F" />
                <input type="radio" name="steer_ohms" value="N" />
                <label>Ohms</label>
              </div>
            </div>
          </div>
        </div>

        {/* Battery */}
        <div className="section battery-section">
          <h3>5. Battery</h3>
          <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
          <div className="inspection-row"><input type="radio" name="volts_loaded" value="P" required />
            <input type="radio" name="volts_loaded" value="F" />
            <input type="radio" name="volts_loaded" value="N" />
            <label>Volts Loaded</label>
          </div>
          <div className="inspection-row"><input type="radio" name="volts_no_load" value="P" required />
            <input type="radio" name="volts_no_load" value="F" />
            <input type="radio" name="volts_no_load" value="N" />
            <label>Volts No Load</label>
          </div>
          <div className="inspection-row"><input type="radio" name="pos_leakage" value="P" required />
            <input type="radio" name="pos_leakage" value="F" />
            <input type="radio" name="pos_leakage" value="N" />
            <label>Pos. Leakage</label>
          </div>
          <div className="inspection-row"><input type="radio" name="neg_leakage" value="P" required />
            <input type="radio" name="neg_leakage" value="F" />
            <input type="radio" name="neg_leakage" value="N" />
            <label>Neg. Leakage</label>
          </div>
          <div className="inspection-row"><input type="radio" name="sg" value="P" required />
            <input type="radio" name="sg" value="F" />
            <input type="radio" name="sg" value="N" />
            <label>S.G.</label>
          </div>
          <div className="inspection-row"><input type="radio" name="electrolyte_level" value="P" required />
            <input type="radio" name="electrolyte_level" value="F" />
            <input type="radio" name="electrolyte_level" value="N" />
            <label>Electrolyte level</label>
          </div>
        </div>



        {/* 6. Operational Inspection */}
        <div className="section">
          <h3>6. Operational Inspection</h3>
          <div className="inspection-header">
            <span>P</span><span>F</span><span>N</span><span></span>
          </div>

          <div className="inspection-row">
            <input type="radio" name="braking_distance" value="P" required />
            <input type="radio" name="braking_distance" value="F" />
            <input type="radio" name="braking_distance" value="N" />
            <label>Braking Distance</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="plugging_distance" value="P" required />
            <input type="radio" name="plugging_distance" value="F" />
            <input type="radio" name="plugging_distance" value="N" />
            <label>Plugging Distance</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="travel_system" value="P" required />
            <input type="radio" name="travel_system" value="F" />
            <input type="radio" name="travel_system" value="N" />
            <label>Travel System</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="lift_lower_system" value="P" required />
            <input type="radio" name="lift_lower_system" value="F" />
            <input type="radio" name="lift_lower_system" value="N" />
            <label>Lift / Lower System</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="auxiliary_system" value="P" required />
            <input type="radio" name="auxiliary_system" value="F" />
            <input type="radio" name="auxiliary_system" value="N" />
            <label>Auxiliary System</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="steering_system" value="P" required />
            <input type="radio" name="steering_system" value="F" />
            <input type="radio" name="steering_system" value="N" />
            <label>Steering System</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="mini_mast_functions" value="P" required />
            <input type="radio" name="mini_mast_functions" value="F" />
            <input type="radio" name="mini_mast_functions" value="N" />
            <label>Mini Mast Functions</label>
          </div>

          <div className="inspection-row">
            <input type="radio" name="wire_guidance" value="P" required />
            <input type="radio" name="wire_guidance" value="F" />
            <input type="radio" name="wire_guidance" value="N" />
            <label>Wire Guidance</label>
          </div>
        </div>

          {/* 7. Safety */}
        <div className="side-by-side-section">
          <div className="section">
            <h3>7. Safety</h3>
            <div className="inspection-header">
              <span>P</span><span>F</span><span>N</span><span></span>
            </div>

            <div className="inspection-row">
              <input type="radio" name="horn" value="P" required />
              <input type="radio" name="horn" value="F" />
              <input type="radio" name="horn" value="N" />
              <label>Horn</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="travel_alarm" value="P" required />
              <input type="radio" name="travel_alarm" value="F" />
              <input type="radio" name="travel_alarm" value="N" />
              <label>Travel Alarm</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="lights_warning_brake" value="P" required />
              <input type="radio" name="lights_warning_brake" value="F" />
              <input type="radio" name="lights_warning_brake" value="N" />
              <label>Lights – Warning / Brake</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="flood_lights" value="P" required />
              <input type="radio" name="flood_lights" value="F" />
              <input type="radio" name="flood_lights" value="N" />
              <label>Flood Lights</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="emergency_disconnect" value="P" required />
              <input type="radio" name="emergency_disconnect" value="F" />
              <input type="radio" name="emergency_disconnect" value="N" />
              <label>Emergency Disconnect</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="static_straps" value="P" required />
              <input type="radio" name="static_straps" value="F" />
              <input type="radio" name="static_straps" value="N" />
              <label>Static Straps</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="mast_stops_attach_bolts" value="P" required />
              <input type="radio" name="mast_stops_attach_bolts" value="F" />
              <input type="radio" name="mast_stops_attach_bolts" value="N" />
              <label>Mast – Stops / Attach Bolts</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="load_backrest" value="P" required />
              <input type="radio" name="load_backrest" value="F" />
              <input type="radio" name="load_backrest" value="N" />
              <label>Load Backrest</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="fork_condition" value="P" required />
              <input type="radio" name="fork_condition" value="F" />
              <input type="radio" name="fork_condition" value="N" />
              <label>Fork Condition</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="lift_chains" value="P" required />
              <input type="radio" name="lift_chains" value="F" />
              <input type="radio" name="lift_chains" value="N" />
              <label>Lift Chains</label>
            </div>
          </div>
          <div className="section">
            <h3 className="hidden-heading">8. Safety</h3>
            <div className="inspection-header">
              <span>P</span><span>F</span><span>N</span><span></span>
            </div>
            <div className="inspection-row">
              <input type="radio" name="brake_pads_shoes" value="P" required />
              <input type="radio" name="brake_pads_shoes" value="F" />
              <input type="radio" name="brake_pads_shoes" value="N" />
              <label>Brake Pads / Shoes</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="brake_disk_drums" value="P" required />
              <input type="radio" name="brake_disk_drums" value="F" />
              <input type="radio" name="brake_disk_drums" value="N" />
              <label>Brake Disk / Drums</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="parking_brake" value="P" required />
              <input type="radio" name="parking_brake" value="F" />
              <input type="radio" name="parking_brake" value="N" />
              <label>Parking Brake</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="steering_system" value="P" required />
              <input type="radio" name="steering_system" value="F" />
              <input type="radio" name="steering_system" value="N" />
              <label>Steering System</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="warning_decals" value="P" required />
              <input type="radio" name="warning_decals" value="F" />
              <input type="radio" name="warning_decals" value="N" />
              <label>Warning Decals</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="data_plate" value="P" required />
              <input type="radio" name="data_plate" value="F" />
              <input type="radio" name="data_plate" value="N" />
              <label>Data Plate</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="tire_condition" value="P" required />
              <input type="radio" name="tire_condition" value="F" />
              <input type="radio" name="tire_condition" value="N" />
              <label>Tire Condition</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="overhead_guard" value="P" required />
              <input type="radio" name="overhead_guard" value="F" />
              <input type="radio" name="overhead_guard" value="N" />
              <label>Overhead Guard</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="safety_belt_tether" value="P" required />
              <input type="radio" name="safety_belt_tether" value="F" />
              <input type="radio" name="safety_belt_tether" value="N" />
              <label>Safety Belt / Tether</label>
            </div>
            <div className="inspection-row">
              <input type="radio" name="safety_glass" value="P" required />
              <input type="radio" name="safety_glass" value="F" />
              <input type="radio" name="safety_glass" value="N" />
              <label>Safety Glass</label>
            </div>
          </div>
        </div>
        {/* 8. Lubrication */} 

        <div className="section lubrication-section">
          <h3>8. Lubrication</h3>
          <div className="lubrication-grid">
            <div>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row"><input type="radio" name="hydraulic_fluid" value="P" required />
                <input type="radio" name="hydraulic_fluid" value="F" />
                <input type="radio" name="hydraulic_fluid" value="N" />
                <label>Hydraulic Fluid</label>
              </div>
              <div className="inspection-row"><input type="radio" name="oil_filter" value="P" required />
                <input type="radio" name="oil_filter" value="F" />
                <input type="radio" name="oil_filter" value="N" />
                <label>Oil Filter</label>
              </div>
              <div className="inspection-row"><input type="radio" name="drive_unit_gear_oil" value="P" required />
                <input type="radio" name="drive_unit_gear_oil" value="F" />
                <input type="radio" name="drive_unit_gear_oil" value="N" />
                <label>Drive Unit / Gear Oil</label>
              </div>
            </div>
            <div>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row"><input type="radio" name="brake_fluid_reservoir" value="P" required />
                <input type="radio" name="brake_fluid_reservoir" value="F" />
                <input type="radio" name="brake_fluid_reservoir" value="N" />
                <label>Brake Fluid Reservoir</label>
              </div>
              <div className="inspection-row"><input type="radio" name="steer_linkage" value="P" required />
                <input type="radio" name="steer_linkage" value="F" />
                <input type="radio" name="steer_linkage" value="N" />
                <label>Steer Linkage</label>
              </div>
              <div className="inspection-row"><input type="radio" name="mast_chains_bearings" value="P" required />
                <input type="radio" name="mast_chains_bearings" value="F" />
                <input type="radio" name="mast_chains_bearings" value="N" />
                <label>Mast / Chains / Bearings</label>
              </div>
            </div>
            <div>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row"><input type="radio" name="scissor_assembly" value="P" required />
                <input type="radio" name="scissor_assembly" value="F" />
                <input type="radio" name="scissor_assembly" value="N" />
                <label>Scissor Assembly</label>
              </div>
              <div className="inspection-row"><input type="radio" name="carriage_attachments" value="P" required />
                <input type="radio" name="carriage_attachments" value="F" />
                <input type="radio" name="carriage_attachments" value="N" />
                <label>Carriage / Attachments</label>
              </div>
              <div className="inspection-row"><input type="radio" name="load_wheels" value="P" required />
                <input type="radio" name="load_wheels" value="F" />
                <input type="radio" name="load_wheels" value="N" />
                <label>Load Wheels</label>
              </div>
            </div>
            <div>
              <div className="inspection-header"><span>P</span><span>F</span><span>N</span><span></span></div>
              <div className="inspection-row"><input type="radio" name="caster_unit" value="P" required />
                <input type="radio" name="caster_unit" value="F" />
                <input type="radio" name="caster_unit" value="N" />
                <label>Caster Unit</label>
              </div>
              <div className="inspection-row"><input type="radio" name="battery_rollers" value="P" required />
                <input type="radio" name="battery_rollers" value="F" />
                <input type="radio" name="battery_rollers" value="N" />
                <label>Battery Rollers</label>
              </div>
              <div className="inspection-row"><input type="radio" name="pump_couplings" value="P" required />
                <input type="radio" name="pump_couplings" value="F" />
                <input type="radio" name="pump_couplings" value="N" />
                <label>Pump Couplings</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group comments">
        <label for="technician_comments"><strong>Technician Comments:</strong></label><br />
        <textarea id="technician_comments" name="technician_comments" rows="4"></textarea>
      </div>

      <div className="form-group signature">
        <label for="technician_signature"><strong>Technician Signature:</strong></label><br />
        <input type="text" id="technician_signature" name="technician_signature" required />
      </div>

      <div className="submit-container">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
);

};

export default MaintenanceForm;
