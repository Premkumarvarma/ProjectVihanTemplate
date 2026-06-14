package com.example.projectvihan.util;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServiceJsonUtil {
	
	private static Logger logger = LoggerFactory.getLogger(ServiceJsonUtil.class);


	/**
	 * pretty print the bean content 
	 * as json format
	 * 
	 * @param value
	 * @return
	 */
	public static String prettyPrintBean(Object value){
		String retvalue = null;
		try{
			//retvalue = new ObjectMapper().defaultPrettyPrintingWriter().writeValueAsString(value);
		}catch(Exception e){
			logger.error(e.getMessage(), e);
		}
		return retvalue;
	}



	/**
	 * convert the object to json string without converting to pretty format
	 * @param value
	 * @return
	 */
	public static String convertToJson(Object value){
		String retvalue = null;		
		try{
			//retvalue = new ObjectMapper().writeValueAsString(value);
		}catch(Exception e){
			logger.error(e.getMessage(), e);
		}
		return retvalue;
	}


	/**
	 * convert the list to Json String format	
	 * @param list
	 * @return
	 */


	public static String convertListToJson(List list){
		StringBuilder sb=null;
		sb = new StringBuilder(list.size());
		for (int i = 0; i < list.size(); i++) {
			sb.append(list.get(i));
			if (i < list.size() - 1) {
				sb.append(",");
			}
		}
		String json = "[" + sb.toString() + "]";
		logger.debug(json);
		return json;

	}


}
