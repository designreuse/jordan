<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="../../include/include.jsp" />
<title><fmt:message key="trip.report.list.search"/></title>
</head>
<body>
<%@ include file="../../include/left.jsp" %>
<div class="row site">
	<div class="wrapper-content margint95 margin60">
		<div class="profile profile_box02">
		
			<!--search form-->
			<div class="tab-content m-b">
				<div class="tab-cotent-title"><fmt:message key="trip.report.list.search"/></div>
		        
				<div class="search_form">
					<form class="form-horizontal row" id="searchForm" onsubmit="return false;">
						<%--车牌号 --%>
						<div class="form-group col-md-6">
							<label class="col-sm-3 control-label"><fmt:message key="trip.report.label.vehiclePlateNumber"/></label>
							<div class="col-sm-9">
								<input type="text" class="form-control" id="s_vehiclePlateNumber"
									name="s_vehiclePlateNumber">
							</div>
						</div>
						<%--追踪终端号（设备号） --%>
						<div class="form-group col-md-6">
							<label class="col-sm-3 control-label"><fmt:message key="trip.report.label.trackingDeviceNumber"/></label>
							<div class="col-sm-9">
								<input type="text" class="form-control" id="s_trackingDeviceNumber"
									name="s_trackingDeviceNumber">
							</div>
						</div>
						<%--检入时间，起/止 --%>
						<div class="form-group col-md-6">
							<label class="col-sm-3 control-label"><fmt:message key="trip.report.label.checkinTime"/></label>
							<div class="input-group date col-sm-4" id="form_checkinStartTime">
								<input type="text" class="form-control" id="s_checkinStartTime" name="s_checkinStartTime" readonly>
								<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
							</div>
							<label class="col-sm-1 control-label" style="text-align: center;">-</label>
							<div class="input-group date col-sm-4" id="form_checkinEndTime">
								<input type="text" class="form-control" id="s_checkinEndTime" name="s_checkinEndTime" readonly>
								<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
							</div>
						</div>
						<%--检出时间，起/止 --%>
						<div class="form-group col-md-6">
							<label class="col-sm-3 control-label"><fmt:message key="trip.report.label.checkoutTime"/></label>
							<div class="input-group date col-sm-4" id="form_checkoutStartTime">
								<input type="text" class="form-control" id="s_checkoutStartTime" name="s_checkoutStartTime" readonly>
								<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
							</div>
							<label class="col-sm-1 control-label" style="text-align: center;">-</label>
							<div class="input-group date col-sm-4" id="form_checkoutEndTime">
								<input type="text" class="form-control" id="s_checkoutEndTime" name="s_checkoutEndTime" readonly>
								<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
							</div>
						</div>
						<%--检入用户 --%>
						<div class="form-group col-md-6">
							<label class="col-sm-3 control-label"><fmt:message key="trip.report.label.checkinUser"/></label>
							<div class="col-sm-9">
						   	    <div id="menuContent">
									<ul id="userTree" class="ztree" style="margin-top:0; width:180px; height: 300px;"></ul>
								</div>
					   	      <input type="text" class="form-control input-sm" id="userChecked" name="userChecked" readonly="readonly" onclick="showMenu()">
					   	      <input type="hidden" id="s_checkinUserId" name="s_checkinUserId" />
					   	    </div>
						</div>
						<%--检出用户 --%>
						<div class="form-group col-md-6">
							<label class="col-sm-3 control-label"><fmt:message key="trip.report.label.checkoutUser"/></label>
							<div class="col-sm-9">
						   	    <div id="menuContent1">
									<ul id="userTree1" class="ztree" style="margin-top:0; width:180px; height: 300px;"></ul>
								</div>
					   	      <input type="text" class="form-control input-sm" id="userChecked1" name="userChecked1" readonly="readonly" onclick="showMenu1()">
					   	      <input type="hidden" id="s_checkoutUserId" name="s_checkoutUserId" />
					   	    </div>
						</div>
						<div class="clearfix"></div>
						<div class="form-group">
							<div class="col-sm-offset-9 col-md-3">
								<button type="submit" class="btn btn-danger" onclick="search();"><fmt:message key="common.button.query"/></button>
								<button type="reset" class="btn btn-darch"><fmt:message key="common.button.reset"/></button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!--search form end-->
			
			<!--my result-->
			<div class="tab-content m-b">
				<div class="tab-cotent-title">
					<%--buttons --%>
					<div class="Features pull-right">
						<ul>
							<li><a id="exportBtn" class="btn btn-info"><fmt:message key="common.button.exportExcel"/></a></li>
						</ul>
					</div>
					<%--buttons end--%>
					<fmt:message key="trip.report.list.title"/>
				</div>
				<div class="search_table">
					<div>
						<table id="tripReportListTable"></table>
					</div>
				</div>
			</div>
			<!--my result end-->
		</div>
	</div>
</div>
<script type="text/javascript">
	var root = "${root}";
</script>
<script type="text/javascript" src="${root}/monitor/tripReport/js/userTree.js"></script>
<script type="text/javascript" src="${root}/monitor/tripReport/js/list.js"></script>
</body>
</html>