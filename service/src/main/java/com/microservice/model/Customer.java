package com.microservice.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NonNull
	private String firstname;
	@NonNull
	private String lastname;
	@NonNull
	private String email;

	private String funkyId;

	private LocalDateTime createdOn = LocalDateTime.now();
	private LocalDateTime updatedOn = LocalDateTime.now();

}
