package org.example.apifurama.controller;

import lombok.RequiredArgsConstructor;
import org.example.apifurama.entity.Customer;
import org.example.apifurama.service.CustomerService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("*")  // Cho React truy cập
//@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    public CustomerController (CustomerService customerService){
        this.customerService = customerService;
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Customer>> findAll() {
        return ResponseEntity.ok(customerService.findAll());
    }

    // GET 1
    @GetMapping("/{id}")
    public ResponseEntity<Customer> findById(@PathVariable Long id) {
        Customer c = customerService.findById(id);
        return c != null ? ResponseEntity.ok(c) : ResponseEntity.notFound().build();
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody Customer c) {
        return ResponseEntity.ok(customerService.save(c));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer c) {
        Customer existing = customerService.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();

        c.setId(id);
        return ResponseEntity.ok(customerService.save(c));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Customer existing = customerService.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();

        customerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
