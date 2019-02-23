package com.leverx.leverxspringdemo.domain;

import java.util.List;

public class Destination {
	private String name;

	private String description;

	private String destinationType;

	private List<Props> propsList;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDestinationType() {
		return destinationType;
	}

	public void setDestinationType(String destinationType) {
		this.destinationType = destinationType;
	}

	public List<Props> getPropsList() {
		return propsList;
	}

	public void setPropsList(List<Props> propsList) {
		this.propsList = propsList;
	}
}
