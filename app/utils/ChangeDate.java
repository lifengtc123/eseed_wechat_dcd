package utils;

import org.joda.time.DateTime;



/** 
 * 操作date 
 * @author zhujl 
 */  
public class ChangeDate {
	
	// 当天
	public static DateTime getThisDay() {
		DateTime now = new DateTime();
		return now;
	}

	// 上一天
	public static DateTime getPrevDay(int year, int month , int day) {
		DateTime now = new DateTime();
		now = now.withYear(year);
		now = now.withMonthOfYear(month);
		now = now.withDayOfMonth(day);
		now = now.plusDays(-1);
		return now;
	}

	// 下一天
	public static DateTime getNextDay(int year, int month , int day) {
		DateTime now = new DateTime();
		now = now.withYear(year);
		now = now.withMonthOfYear(month);
		now = now.withDayOfMonth(day);
		now = now.plusDays(1);
		return now;
	}
	
	// 本月
	public static DateTime getThisMonth() {
		DateTime now = new DateTime();
		now = now.withTime(0, 0, 0, 0);
		now = now.withDayOfMonth(1);
		return now;
	}

	// 上一个月
	public static DateTime getPrevMonth(int year, int month) {
		DateTime now = new DateTime();
		now = now.withYear(year);
		now = now.withMonthOfYear(month);
		now = now.plusMonths(-1);
		now = now.withTime(0, 0, 0, 0);
		now = now.withDayOfMonth(1);
		return now;
	}

	// 下一个月
	public static DateTime getNextMonth(int year, int month) {
		DateTime now = new DateTime();
		now = now.withYear(year);
		now = now.withMonthOfYear(month);
		now = now.plusMonths(1);
		now = now.withTime(0, 0, 0, 0);
		now = now.withDayOfMonth(1);
		return now;
	}
	
	// 本年
	public static DateTime getThisYear() {
		DateTime now = new DateTime();;
		return now;
	}

	// 上一年
	public static DateTime getPrevYear(int year) {
		DateTime now = new DateTime();
		now = now.withYear(year);
		now = now.plusYears(-1);
		return now;
	}

	// 下一年
	public static DateTime getNextYear(int year) {
		DateTime now = new DateTime();
		now = now.withYear(year);
		now = now.plusYears(1);
		return now;
	}
	
}
