package com.leverx.leverxspringdemo.domain;

import java.sql.Timestamp;

public class Person {
	
	private long usid;
	private String name;
	private Timestamp ts_update;
	private Timestamp ts_create;
	
	public Timestamp getTs_update() {
		return ts_update;
	}
	
	public void setTs_update(Timestamp ts_update) {
		this.ts_update = ts_update;
	}

	public Timestamp getTs_create() {
		return ts_create;
	}

	public void setTs_create(Timestamp ts_create) {
		this.ts_create = ts_create;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return usid;
	}

	public void setId(long id) {
		this.usid = id;
	}
	
}
