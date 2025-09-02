package com.managelift.forkliftmanagement.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "technician_customers")
@IdClass(TechnicianCustomerId.class)
public class TechnicianCustomer {

    @Id
    @Column(name = "technician_id")
    private Long technicianId;

    @Id
    @Column(name = "customer_id")
    private Long customerId;

    // Required for JPA
    public TechnicianCustomer() {}

    public TechnicianCustomer(Long technicianId, Long customerId) {
        this.technicianId = technicianId;
        this.customerId = customerId;
    }

}
