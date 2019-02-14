package com.pta_hw6.ptahw6springdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan("com.sap.cloud.sdk")
public class PtaHw6SpringDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PtaHw6SpringDemoApplication.class, args);
	}

}
