package org.example.apifurama.service;

import org.example.apifurama.entity.Customer;

import java.util.List;

public interface ICustomerService {
    public List<Customer> findAll();
    public Customer findById(Long id);
    public Customer save(Customer c);
    public void delete(Long id);
}
