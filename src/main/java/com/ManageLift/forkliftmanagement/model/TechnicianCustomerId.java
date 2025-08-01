package com.managelift.forkliftmanagement.model;

import java.io.Serializable;
import java.util.Objects;

public class TechnicianCustomerId implements Serializable {
    private Long technicianId;
    private Long customerId;

    public TechnicianCustomerId() {}

    public TechnicianCustomerId(Long technicianId, Long customerId) {
        this.technicianId = technicianId;
        this.customerId = customerId;
    }

    // equals & hashCode required
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TechnicianCustomerId that)) return false;
        return Objects.equals(technicianId, that.technicianId) &&
                Objects.equals(customerId, that.customerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(technicianId, customerId);
    }
}
