package com.hni.fullstackProject.controller;

import com.hni.fullstackProject.dao.UserRepository;
import com.hni.fullstackProject.dao.UserTypeRepository;
import com.hni.fullstackProject.entity.User;
import com.hni.fullstackProject.entity.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTypeRepository userTypeRepository;

    // GET '/users' - return list of all users
    @GetMapping
    public List<User> list() {
        return userRepository.findAll();
    }

    // GET '/users/{id}' - return a user by id
    @GetMapping("/{id}")
    public User userById(@PathVariable int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // POST '/users' - to create a new user
    @PostMapping
    public User create(@RequestBody User user) {

        int userTypeId = user.getUserType().getId();

        UserType userType = userTypeRepository.findById(userTypeId)
                .orElseThrow(() -> new RuntimeException("UserType not found"));

        user.setUserType(userType); // attach managed entity
        User savedUser = userRepository.save(user);

        return userRepository.save(user);
    }

    // PUT '/users/{id}' - update a user by id
    @PutMapping("/{id}")
    public User update(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    // DELETE '/users/{id}' - delete a user by id
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        System.out.println("Deleting a user id :" + id);
        userRepository.deleteById(id);
    }

}
