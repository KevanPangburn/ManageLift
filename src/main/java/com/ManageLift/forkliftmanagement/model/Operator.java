package com.managelift.forkliftmanagement.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "operators",
        uniqueConstraints = {
                @UniqueConstraint(name = "operators_user_id_uk", columnNames = "user_id")
        },
        indexes = {
                @Index(name = "operators_customer_id_idx", columnList = "customer_id")
        }
)
public class Operator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true,
            foreignKey = @ForeignKey(name = "operators_user_id_fk")
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "customer_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "operators_customer_id_fk")
    )
    private Customer customer;

    protected Operator() {
        // JPA
    }

    public Operator(User user, Customer customer) {
        this.user = user;
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Customer getCustomer() {
        return customer;
    }
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Operator)) return false;
        Operator other = (Operator) o;
        return id != null && id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
