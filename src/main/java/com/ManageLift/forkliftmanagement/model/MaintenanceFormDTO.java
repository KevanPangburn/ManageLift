package com.managelift.forkliftmanagement.model;

import java.util.Map;

public class MaintenanceFormDTO {
    private String customer_name;
    private String address;
    private String city;
    private String state;
    private String customer_po;
    private String date_started;
    private String date_completed;
    private String unit_id;
    private String make;
    private String model;
    private String serial_number;
    private String hour_meter;
    private String technician_comments;
    private String technician_signature;
    private Map<String, String> inspection_data;

    // Getters and setters
    public String getCustomer_name() { return customer_name; }
    public void setCustomer_name(String customer_name) { this.customer_name = customer_name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCustomer_po() { return customer_po; }
    public void setCustomer_po(String customer_po) { this.customer_po = customer_po; }

    public String getDate_started() { return date_started; }
    public void setDate_started(String date_started) { this.date_started = date_started; }

    public String getDate_completed() { return date_completed; }
    public void setDate_completed(String date_completed) { this.date_completed = date_completed; }

    public String getUnit_id() { return unit_id; }
    public void setUnit_id(String unit_id) { this.unit_id = unit_id; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getSerial_number() { return serial_number; }
    public void setSerial_number(String serial_number) { this.serial_number = serial_number; }

    public String getHour_meter() { return hour_meter; }
    public void setHour_meter(String hour_meter) { this.hour_meter = hour_meter; }

    public String getTechnician_comments() { return technician_comments; }
    public void setTechnician_comments(String technician_comments) { this.technician_comments = technician_comments; }

    public String getTechnician_signature() { return technician_signature; }
    public void setTechnician_signature(String technician_signature) { this.technician_signature = technician_signature; }

    public Map<String, String> getInspection_data() { return inspection_data; }
    public void setInspection_data(Map<String, String> inspection_data) { this.inspection_data = inspection_data; }
}
