package com.example.projectvihan.util;

import java.util.HashMap;
import java.util.Map;

public class ServiceResponse {
	
	private String status;
	private String statusMsg;
	private String errorCode;
	private Map<String, Object> data = new HashMap<String, Object>();
	
	@Override
	public String toString() {

		return ServiceJsonUtil.prettyPrintBean(this);

	}
	public void addDataObject(String key, Object dataObject){
		data.put(key, dataObject);
	}
	public Map<String, Object> getData() {
		return data;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusMsg() {
		return statusMsg;
	}
	public void setStatusMsg(String statusMsg) {
		this.statusMsg = statusMsg;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}


}
