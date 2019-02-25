package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.ICarsDao;
import com.leverx.leverxspringdemo.domain.Cars;

@Repository
public class CarsDao implements ICarsDao {

	private static final Logger logger = LoggerFactory.getLogger(CarsDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Cars> getById(Long id) {
		Optional<Cars> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"crid\", \"name\", \"usid\" FROM \"HW_3::Cars\" WHERE \"crid\" = ?")) {
			stmnt.setLong(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Cars cars = new Cars();
				cars.setCrid(id);
				cars.setName(result.getString("name"));
				cars.setUsid(result.getLong("usid"));
				entity = Optional.of(cars);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Cars> getAll() {
		List<Cars> carsList = new ArrayList<Cars>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"crid\", \"name\", \"usid\" FROM \"HW_3::Cars\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Cars cars = new Cars();
				cars.setCrid(result.getLong("crid"));
				cars.setName(result.getString("name"));
				cars.setUsid(result.getLong("usid"));
				carsList.add(cars);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return carsList;
	}

	@Override
	public void save(Cars entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO \"HW_3::Cars\"(\"crid\",\"name\", \"usid\") VALUES (?,?,?)")) {
			stmnt.setLong(1, entity.getCrid());
			stmnt.setString(2, entity.getName());
			stmnt.setLong(3, entity.getUsid());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(Long id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"HW_3::Cars\" WHERE \"crid\" = ?")) {
			stmnt.setLong(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Cars entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE \"HW_3::Cars\" SET \"name\" = ?, \"usid\" = ? WHERE \"crid\" = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setLong(2, entity.getUsid());
			stmnt.setLong(3, entity.getCrid());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
