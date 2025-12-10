package org.example.apifurama.service;

import org.example.apifurama.entity.Customer;
import org.example.apifurama.repository.ICustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService implements ICustomerService {
    private final ICustomerRepository customerRepository;

    public CustomerService(ICustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public Customer save(Customer c) {
        return customerRepository.save(c);
    }

    @Override
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }
}
