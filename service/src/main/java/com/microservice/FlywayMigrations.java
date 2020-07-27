package com.microservice;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Different types of migration stratergies.
 *
 */
@Configuration
public class FlywayMigrations {

	private Logger logger = LoggerFactory.getLogger(FlywayMigrations.class);

	/**
	 * In a dockerized world, we don't need to clean and migrate, but still keeping
	 * it for now.
	 */
	@Bean
	@Profile("test")
	public FlywayMigrationStrategy cleanMigration() {
		FlywayMigrationStrategy strategy = new FlywayMigrationStrategy() {

			@Override
			public void migrate(Flyway flyway) {
				logger.info("Using clean-migrate flyway strategy -- production profile not active");
				flyway.clean();
				flyway.migrate();
			}
		};
		return strategy;
	}

	/**
	 * For regular use cases, this bean will be injected.
	 */
	@Bean
	@Profile("!test")
	public FlywayMigrationStrategy defaultMigration() {
		FlywayMigrationStrategy strategy = new FlywayMigrationStrategy() {

			@Override
			public void migrate(Flyway flyway) {
				logger.info("Doing a default migration");
				flyway.migrate();
			}
		};
		return strategy;
	}

}
