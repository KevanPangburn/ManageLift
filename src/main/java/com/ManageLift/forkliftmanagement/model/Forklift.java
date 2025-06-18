package com.managelift.forkliftmanagement.model;


import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "forklifts")
public class Forklift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit_number")
    private String unitId;

    private String make;

    private String model;

    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "hour_meter")
    private String hourMeter;

    @OneToMany(mappedBy = "forklift", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MaintenanceLog> maintenanceLogs;

    public Forklift() {
    }

    public Forklift(String unitId, String make, String model, String serialNumber, String hourMeter) {
        this.unitId = unitId;
        this.make = make;
        this.model = model;
        this.serialNumber = serialNumber;
        this.hourMeter = hourMeter;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getHourMeter() {
        return hourMeter;
    }

    public void setHourMeter(String hourMeter) {
        this.hourMeter = hourMeter;
    }

    public List<MaintenanceLog> getMaintenanceLogs() {
        return maintenanceLogs;
    }

    public void setMaintenanceLogs(List<MaintenanceLog> maintenanceLogs) {
        this.maintenanceLogs = maintenanceLogs;
    }
}
