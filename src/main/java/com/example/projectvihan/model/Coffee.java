package com.example.projectvihan.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name ="coffee")
public class Coffee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long coffeeId;
	private String coffeeName;
	private Double price;
	private String category;
	private Boolean available;
	
	public Long getCoffeeId() {
		return coffeeId;
	}
	public void setCoffeeId(Long coffeeId) {
		this.coffeeId = coffeeId;
	}
	public String getCoffeeName() {
		return coffeeName;
	}
	public void setCoffeeName(String coffeeName) {
		this.coffeeName = coffeeName;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Boolean getAvailable() {
		return available;
	}
	public void setAvailable(Boolean available) {
		this.available = available;
	}


}
