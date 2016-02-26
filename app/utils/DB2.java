package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import play.mvc.Scope.Session;

public class DB2 {
	
	public static Connection getCon() {
		String driverName = "com.mysql.jdbc.Driver";
		String dbURL = "jdbc:mysql://192.168.1.8:3306/attendance?useUnicode=true&characterEncoding=UTF-8";
		String userName = "root";
		String userPwd = "root";
		Connection dbConn = null;

		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			dbConn = DriverManager.getConnection(dbURL, userName, userPwd);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return dbConn;

	}

	public static Statement getStmt(Connection con) {
		Statement stmt = null;
		try {
			stmt = con.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return stmt;

	}

	public static ResultSet executeQuery(Statement stmt, String sql) {

		ResultSet rs = null;
		try {
			rs = stmt.executeQuery(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}
	
	public static PreparedStatement prepareStmt(Connection conn, String sql) {
		PreparedStatement pstmt = null;
		try {
			pstmt = conn.prepareStatement(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return pstmt;
	}

	public static void close(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			conn = null;
		}
	}

	public static void close(Statement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			stmt = null;
		}
	}

	public static void close(ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			rs = null;
		}
	}
	
	public static void insertHistory(String message){
		Session session = Session.current();
		System.out.println(session.get("username"));
		String sql = "insert into history(username,message,datetime,error) values(?,?,?,1)";
		try {
			Connection conn = getCon();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, session.get("username"));
			ps.setString(2, message);
			ps.setLong(3,System.currentTimeMillis());
			ps.execute();
			close(ps);
			close(conn);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
