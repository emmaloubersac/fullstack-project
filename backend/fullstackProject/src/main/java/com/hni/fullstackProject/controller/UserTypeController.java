package com.hni.fullstackProject.controller;

import com.hni.fullstackProject.dao.UserTypeRepository;
import com.hni.fullstackProject.entity.User;
import com.hni.fullstackProject.entity.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userTypes")
@CrossOrigin(origins = "http://localhost:4200")
public class UserTypeController {

    @Autowired
    private UserTypeRepository userTypeRepository;

    // GET '/userTypes' - return list of all userTypes
    @GetMapping
    public List<UserType> list() {
        return userTypeRepository.findAll(); }

    // GET '/userTypes/{id}' - return a userType by id
    @GetMapping("/{id}")
    public UserType userTypeById(@PathVariable int id) {
        return userTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // POST '/userTypes' - to create a new userType
    @PostMapping
    public UserType create(@RequestBody @Validated UserType userType) {
        return userTypeRepository.save(userType); }

    // PUT '/userTypes/{id}' - update a userType by id
    @PutMapping("/{id}")
    public UserType update(@PathVariable int id, @RequestBody UserType userType) {
        userType.setId(id);
        return userTypeRepository.save(userType);
    }

    // DELETE '/userTypes/{id}' - delete a userType by id
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        userTypeRepository.deleteById(id); }

}
