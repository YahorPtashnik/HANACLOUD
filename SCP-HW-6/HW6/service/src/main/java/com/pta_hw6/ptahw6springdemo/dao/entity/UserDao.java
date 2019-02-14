package com.pta_hw6.ptahw6springdemo.dao.entity;

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
import com.pta_hw6.ptahw6springdemo.dao.intfce.IUserDao;
import com.pta_hw6.ptahw6springdemo.domain.User;

@Repository
public class UserDao implements IUserDao {

	private static final Logger logger = LoggerFactory.getLogger(UserDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<User> getById(String id) {
		Optional<User> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT TOP 1 \"usid\", \"name\" FROM \"HW_3::User WHERE\"usid\" = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				User user = new User();
				user.setUsid(id);
				user.setName(result.getString("name"));
				entity = Optional.of(user);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<User> getAll() {
		List<User> userList = new ArrayList<User>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("SELECT \"usid\", \"name\" FROM \"HW_3::User\"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				User user = new User();
				user.setUsid(result.getString("USID"));
				user.setName("NAME");
				userList.add(user);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return userList;
	}

	@Override
	public void save(User entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("INSERT INTO \"HW_3::User\" (\"name\") VALUES (?)")) {
			stmnt.setString(1, entity.getName());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error whilte trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM \"HW_3::User\" WHERE \"usid\" = ?")) {
			stmnt.setString(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(User entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("UPDATE \"HW_3::User\" SET \"name\" = ? WHERE \"usid\" = ?")) {
			stmnt.setString(1, entity.getName());
			stmnt.setString(2, entity.getUsid());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}
}
