package com.hni.fullstackProject.dao;

import com.hni.fullstackProject.entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTypeRepository extends JpaRepository<UserType, Integer> {
}
