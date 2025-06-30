package com.hni.fullstackProject.dao;

import com.hni.fullstackProject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
