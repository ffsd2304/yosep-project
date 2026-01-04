package com.yosep.myweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class MyWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyWebApplication.class, args);
	}

}
