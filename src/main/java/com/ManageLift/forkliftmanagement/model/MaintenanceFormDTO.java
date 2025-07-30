package com.managelift.forkliftmanagement.model;

import java.util.Map;

public class MaintenanceFormDTO {
    private Long forkliftId;
    private Long technicianId;
    private String customerName;
    private String customerPO;
    private String address;
    private String city;
    private String state;
    private String dateStarted;
    private String dateCompleted;
    private String unitId;
    private String make;
    private String model;
    private String serialNumber;
    private String hourMeter;
    private String technicianComments;
    private String technicianSignature;
    private Map<String, String> inspectionData;
    private String description;

    public Long getForkliftId() { return forkliftId; }
    public void setForkliftId(Long forkliftId) { this.forkliftId = forkliftId; }

    public Long getTechnicianId() { return technicianId; }
    public void setTechnicianId(Long technicianId) { this.technicianId = technicianId; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerPO() { return customerPO; }
    public void setCustomerPO(String customerPO) { this.customerPO = customerPO; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDateStarted() { return dateStarted; }
    public void setDateStarted(String dateStarted) { this.dateStarted = dateStarted; }

    public String getDateCompleted() { return dateCompleted; }
    public void setDateCompleted(String dateCompleted) { this.dateCompleted = dateCompleted; }

    public String getUnitId() { return unitId; }
    public void setUnitId(String unitId) { this.unitId = unitId; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getHourMeter() { return hourMeter; }
    public void setHourMeter(String hourMeter) { this.hourMeter = hourMeter; }

    public String getTechnicianComments() { return technicianComments; }
    public void setTechnicianComments(String technicianComments) { this.technicianComments = technicianComments; }

    public String getTechnicianSignature() { return technicianSignature; }
    public void setTechnicianSignature(String technicianSignature) { this.technicianSignature = technicianSignature; }

    public Map<String, String> getInspectionData() { return inspectionData; }
    public void setInspectionData(Map<String, String> inspectionData) { this.inspectionData = inspectionData; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
