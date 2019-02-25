package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IPersonDao;
import com.leverx.leverxspringdemo.domain.Person;

@Repository
public class PersonDao implements IPersonDao {

	private static final Logger logger = LoggerFactory.getLogger(PersonDao.class);
	private static Timestamp getCurrTime() {
		Date date = new Date(0);
		Timestamp currtime = new Timestamp(date.getTime());
		return currtime;
	}
	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Person> getById(Long id) {
		Optional<Person> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"usid\", \"name\", \"ts_update\", \"ts_create\" FROM \"HW_3::Person\" WHERE \"usid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Person person = new Person();
				person.setId(id);
				person.setName(result.getString("name"));
				person.setTs_update(result.getTimestamp("ts_update"));
				person.setTs_create(result.getTimestamp("ts_create"));
				entity = Optional.of(person);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Person> getAll() {
		List<Person> personList = new ArrayList<Person>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"usid\", \"name\", \"ts_update\", \"ts_create\" FROM \"HW_3::Person\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Person person = new Person();
				person.setId(result.getLong("usid"));
				person.setName(result.getString("name"));
				person.setTs_update(result.getTimestamp("ts_update"));
				person.setTs_create(result.getTimestamp("ts_create"));
				personList.add(person);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return personList;
	}

	@Override
	public void save(Person entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"HW_3::Person\"(\"name\", \"ts_update\", \"ts_create\") VALUES (?, ?, ?)")) {
			stmnt.setString(1, entity.getName());
			Timestamp currtime = getCurrTime();
			stmnt.setTimestamp(2, currtime);
			stmnt.setTimestamp(3, currtime);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"HW_3::Person\" WHERE \"usid\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Person entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"HW_3::Person\" SET \"name\" = ?, \"ts_update\" = ? WHERE \"usid\" = ?")) {
			stmnt.setString(1, entity.getName());
			Timestamp currtime = getCurrTime();
			stmnt.setTimestamp(2, currtime);
			stmnt.setLong(3, entity.getId());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
