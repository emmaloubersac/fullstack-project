package com.hni.fullstackProject;

import com.hni.fullstackProject.dao.UserRepository;
import com.hni.fullstackProject.dao.UserTypeRepository;
import com.hni.fullstackProject.entity.User;
import com.hni.fullstackProject.entity.UserType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FullstackProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullstackProjectApplication.class, args);
	}

}
