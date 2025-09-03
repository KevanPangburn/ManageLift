package com.managelift.forkliftmanagement.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "customer_users",
        uniqueConstraints = {
                // String[] required for columnNames
                @UniqueConstraint(name = "customer_users_user_id_uk", columnNames = {"user_id"})
        },
        indexes = {
                // In Jakarta persistence use columnList (NOT columnNames)
                @Index(name = "customer_users_customer_id_idx", columnList = "customer_id")
        }
)
public class CustomerUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true,
            foreignKey = @ForeignKey(name = "customer_users_user_id_fk")
    )
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "customer_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "customer_users_customer_id_fk")
    )
    private Customer customer;

    protected CustomerUser() { }

    public CustomerUser(User user, Customer customer) {
        this.user = user;
        this.customer = customer;
    }

    public Long getId() { return id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustomerUser)) return false;
        CustomerUser other = (CustomerUser) o;
        return id != null && id.equals(other.id);
    }

    @Override
    public int hashCode() { return 31; }
}
