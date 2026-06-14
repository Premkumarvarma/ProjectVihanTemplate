package com.example.projectvihan.Exception;

public class AppException extends Exception{
	

private String errorCode;
	
	public AppException (String errorcode, String errMsg) {
		super(errMsg);
		this.errorCode = errorcode;
	}
	
	public AppException(String errCode, String errMsg, Throwable e) {
		super(errMsg, e);
	}
	
	public AppException(Throwable e) {
		super(e);
	}

	public String getErrorCode () {
		return errorCode;
	}
}
