package com.managelift.forkliftmanagement.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.managelift.forkliftmanagement.config.MapToJsonConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "maintenance_logs")
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "forklift_id", nullable = false)
    @JsonBackReference
    private Forklift forklift;

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

    @Column(name = "technician_comments")
    private String technicianComments;

    @Column(name = "technician_signature")
    private String technicianSignature;
}
