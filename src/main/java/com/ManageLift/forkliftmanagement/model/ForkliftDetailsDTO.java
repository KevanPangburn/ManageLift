package com.managelift.forkliftmanagement.model;

public class ForkliftDetailsDTO {
    private String unitId;
    private String make;
    private String model;
    private String serialNumber;
    private String hourMeter;
    private String customerName;
    private String customerAddress;
    private String customerCity;
    private String customerState;

    public ForkliftDetailsDTO(String unitId, String make, String model, String serialNumber, String hourMeter,
                              String customerName, String customerAddress, String customerCity, String customerState) {
        this.unitId = unitId;
        this.make = make;
        this.model = model;
        this.serialNumber = serialNumber;
        this.hourMeter = hourMeter;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.customerCity = customerCity;
        this.customerState = customerState;
    }

    // Getters
    public String getUnitId() { return unitId; }
    public String getMake() { return make; }
    public String getModel() { return model; }
    public String getSerialNumber() { return serialNumber; }
    public String getHourMeter() { return hourMeter; }
    public String getCustomerName() { return customerName; }
    public String getCustomerAddress() { return customerAddress; }
    public String getCustomerCity() { return customerCity; }
    public String getCustomerState() { return customerState; }
}
