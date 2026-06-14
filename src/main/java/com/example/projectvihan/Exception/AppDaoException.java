package com.example.projectvihan.Exception;

public class AppDaoException extends AppException{
	
private static final long serialVersionUID = 1L;
	
	public AppDaoException (String errCode, String errMsg) {
		super(errCode, errMsg);
	}
	
	public AppDaoException (String errCode, String errMsg, Throwable e) {
		super(errCode, errMsg, e);
	}
	public AppDaoException(Throwable e) {
		super(e);
		
	}

}
