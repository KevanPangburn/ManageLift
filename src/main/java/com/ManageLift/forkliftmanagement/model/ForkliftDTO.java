package com.managelift.forkliftmanagement.model;

public class ForkliftDTO {
    private String make;
    private String model;
    private String serialNumber;
    private String hourMeter;

    public ForkliftDTO(String make, String model, String serialNumber, String hourMeter) {
        this.make = make;
        this.model = model;
        this.serialNumber = serialNumber;
        this.hourMeter = hourMeter;
    }

    public String getMake() { return make; }
    public String getModel() { return model; }
    public String getSerialNumber() { return serialNumber; }
    public String getHourMeter() { return hourMeter; }
}
