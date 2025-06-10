package com.ManageLift.forklift_management.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import java.util.Map;
import com.ManageLift.forklift_management.config.MapToJsonConverter;


@Getter
@Setter
@Entity
@Table(name = "maintenance_logs")
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "forklift_id")
    private Integer forkliftId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_po")
    private String customerPO;

    @Column(name = "inspection_data")
    @Convert(converter = MapToJsonConverter.class)
    private Map<String, String> inspectionData;

    private String address;
    private String city;
    private String state;
    private String unitId;
    private String make;
    private String model;
    private String serialNumber;
    private String hourMeter;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private User technician;

    @Column(name = "performed_at")
    private LocalDateTime dateStarted;

    @Column(name = "date_completed")
    private LocalDateTime dateCompleted;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private String description;
}
