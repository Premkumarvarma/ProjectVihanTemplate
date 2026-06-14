package com.example.projectvihan.util;

public class ServiceControllerUtils {
	
	public ServiceResponse prepareMobileResponseErrorStatus(ServiceResponse mresponse, String errorCode, String statusMsg) {
		mresponse.setStatus(AppConstants.ERRORCODE);
		mresponse.setErrorCode(AppConstants.EXCEPTIONERRORCODE);
		mresponse.setStatusMsg(statusMsg);
		return mresponse;
	}
	/**
	 * Prepares the error mobile response
	 * 
	 * @param mresponse
	 * @param errorCode
	 * @param statusMsg
	 * @param 
	 * @return
	 */
	public ServiceResponse prepareMobileResponseSessionInvalidStatus(ServiceResponse mresponse, String errorCode, String statusMsg) {
		mresponse.setStatus(AppConstants.SESSION_INVALID_CODE);
		//mresponse.setErrorCode(AppConstants.SESSION_ERROR_CODE);
		mresponse.setStatusMsg(statusMsg);
		return mresponse;
	}




	/**
	 * Prepares the success mobile response
	 * 
	 * @param mresponse
	 * @param statusMsg
	 * @param sessionStatus
	 * @return
	 */
	public ServiceResponse prepareMobileResponseSuccessStatus(ServiceResponse mresponse, String statusMsg) {
		mresponse.setStatus(AppConstants.SUCCESSCODE);
		mresponse.setStatusMsg(statusMsg);
		return mresponse;
	}

	public ServiceResponse prepareMobileResponseInvalidData(ServiceResponse mresponse, String statusMsg) {
		mresponse.setStatus(AppConstants.INVALIDCODE);
		mresponse.setStatusMsg(statusMsg);
		mresponse.setErrorCode(AppConstants.INVALID_ERROR_CODE);
		return mresponse;
	}

	public ServiceResponse prepareMobileResponseSuccessStatusUser(ServiceResponse mresponse, String statusMsg) {
		mresponse.setStatus("");
		mresponse.setStatusMsg(statusMsg);
		return mresponse;
	}

	public ServiceResponse prepareMobileResponseErrorStatusUser(ServiceResponse mresponse, String errorCode, String statusMsg) {
		mresponse.setStatus("");
		mresponse.setErrorCode(AppConstants.EXCEPTIONERRORCODE);
		mresponse.setStatusMsg(statusMsg);
		return mresponse;
	}
	
	public ServiceResponse prepareMobileResponseErrorDuplicateStatus(ServiceResponse mresponse, String errorCode, String statusMsg) {
		mresponse.setStatus(AppConstants.DUPLICATECODE);
		mresponse.setErrorCode(AppConstants.RECORD_EXIT_CODE);
		mresponse.setStatusMsg(statusMsg);
		return mresponse;
	}

}
