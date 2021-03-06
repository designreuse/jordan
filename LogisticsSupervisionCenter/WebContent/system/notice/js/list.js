/*****************全局参数******************/
var $table = $("#noticeListTable");
var $ids=[];
var $status = [];
/*****************公用方法******************/
//设置传入参数
function queryParams(params) {
	//遍历form 组装json  
   $.each($("#searchForm").serializeArray(), function(i, field) {  
        console.info(field.name + ":" + field.value + " ");  
        //可以添加提交验证                   
        params += "&" + field.name +"="+ field.value;  
    }); 
    return params;
}

/**
 * 通知列表
 */
function searchNoticeList() {
	var url = root + "/notice/list.action";
	$table.bootstrapTable({
		clickToSelect : true,
		showRefresh : false,
		search : false,
		showColumns : false,
		showExport : false,
		striped : true,
		height : "100%",
		url : url,
		method : "get",
		idfield: "noticeId",
		sortName:"noticeId",
		cache : false,
		pagination : true,
		sidePagination : 'server',
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30 ],
		columns : [ {
			checkbox : true
		}, {
			field : 'noticeTitle',
			title : $.i18n.prop('notice.title')
		}, {
			field : 'noticeContent',
			title :  $.i18n.prop('notice.content')
		}, {
			field : 'noticeState',
			title : $.i18n.prop('notice.status'),
			formatter : stateFormatter
		}, {
			field : 'deployTime',
			title : $.i18n.prop('notice.deployTime')
		}, {
			field : '',
			title : $.i18n.prop('notice.operate'),
			formatter : operateFormatter
		}]

	});
	$table.on('check.bs.table uncheck.bs.table '
					+ 'check-all.bs.table uncheck-all.bs.table', function() {
				// push or splice the selections if you want to save all data
				// selections
				$ids = getIdSelections();
				$status = getSelectedStatus();
			});
}

/**
 * 操作显示
 */
function operateFormatter(value, row, index) {
	// alert(row.id+""+index);
	return [
			'<a class="like" href="javascript:receiveUserList(\'' + row.noticeId
					+ '\')" title="Edit">',
			'<i class="glyphicon glyphicon-pencil"></i>',
			'</a>  ',
	].join('');
}

/**
 * 状态显示
 * 
 * @param value
 * @param row
 * @param index
 */
function stateFormatter(value, row, index) {
	var show;
	if(value == '0') {
		show = $.i18n.prop('notice.draft');
	} else if (value == '1') {
		show = $.i18n.prop('notice.publish');
	} else if(value == '2') {
		show = $.i18n.prop('notice.finish');
	} else {
		show = '--';
	}
	return [show].join('');
}

/**
 * 获取选中的ID
 */
function getIdSelections() {
	return $.map($table.bootstrapTable('getSelections'),
			function(row) {
				return row.noticeId;
			});
}

/**
 * 获取已选的通知状态
 * 
 * @returns
 */
function getSelectedStatus() {
	return $.map($table.bootstrapTable('getSelections'),
			function(row) {
				return row.noticeState;
			});
}

/**
 * 条件查询方法
 */
function search(){
	var params = $table.bootstrapTable('getOptions');
	params.queryParams = function(params) {
        //遍历form 组装json  
        $.each($("#searchForm").serializeArray(), function(i, field) {  
            console.info(field.name + ":" + field.value + " ");  
            //可以添加提交验证                   
            params[field.name] = field.value;  
        });  
        console.log(params);
        return params;  
    }
	$table.bootstrapTable('refresh', {});
}

/**
 * 通知接收人列表
 */
function receiveUserList(id) {
	var url = root + "/notice/toReceiveUserListModal.action?notice.noticeId="+id;
	$('#receiveUserListModal').removeData('bs.modal');
	$('#receiveUserListModal').modal({
		remote : url,
		show : false,
		backdrop: 'static', 
		keyboard: false
	});
	
	$('#receiveUserListModal').on('loaded.bs.modal', function(e) {
		$('#receiveUserListModal').modal('show');
	});
}

/**
 * 
 */
function refesh() {
	$table.bootstrapTable('refresh', params);
}

/****************init********************/
$(function() {
	// 设置表格
	searchNoticeList();
	
	//添加Modal调用方法
	$("#addBtn").click(function() {
		var url = root + "/notice/addModal.action";
		$('#noticeAddModal').removeData('bs.modal');
		$('#noticeAddModal').modal({
			remote : url,
			show : false,
			backdrop: 'static', 
			keyboard: false
		});
		
		$('#noticeAddModal').on('loaded.bs.modal', function(e) {
			$('#noticeAddModal').modal('show');
		});
	});
	
	$("#publishBtn").click(function() {
		if($ids.length == 0) {
			bootbox.alert($.i18n.prop("system.notice.publish.choose"));
		} else if($ids.length > 1){
			bootbox.alert($.i18n.prop("system.notice.publish.choose.only"));
		} else {
			if($status != '0') {
				bootbox.alert($.i18n.prop("system.notice.publish.status.error"));
			} else {
				bootbox.confirm($.i18n.prop("system.notice.publish.confirm"), function(result) {
					if(result) {
						var ajaxUrl = root+'/notice/publish.action?ids='+$ids;
						$.ajax({
							url : ajaxUrl, // 请求url
							type : "post", // 提交方式
							dataType : "json", // 数据类型
							success : function(data) { // 提交成功的回调函数
								if (data) {
									bootbox.success($.i18n.prop("system.notice.publish.success"));
									$table.bootstrapTable('refresh', {});
								} else {
									bootbox.error($.i18n.prop("system.notice.publish.error"));
									$table.bootstrapTable('refresh', {});
								}
							}
						});
					}
				});
			}
		}
	});
	
	//编辑数据
	$("#editBtn").click(function() {
		if($ids.length == 0) {
			bootbox.alert($.i18n.prop("system.notice.edit.choose"));
		} else if($ids.length > 1){
			bootbox.alert($.i18n.prop("system.notice.edit.choose.only"));
		} else {
			if($status != '0') {
				bootbox.alert($.i18n.prop("system.notice.edit.status.error"));
			} else {
				var url = root + "/notice/editModal.action?notice.noticeId="+$ids;
				$('#noticeEditModal').removeData('bs.modal');
				$('#noticeEditModal').modal({
					remote : url,
					show : false,
					backdrop: 'static', 
					keyboard: false
				});
				$('#noticeEditModal').on('loaded.bs.modal', function(e) {
					$('#noticeEditModal').modal('show');
				});
			}
		}
		
	});
	
	//删除数据
	$("#deleteBtn").click(function() {
		if($ids.length == 0) {
			bootbox.alert($.i18n.prop("system.notice.delete.choose"));
		} else {
			//alert($status);
			var flag = true;
			if($status.length > 1) {
				for(var i = 0; i < $status.length; i++) {
					//alert($status[i]);
					if($status[i] != '0') {
						flag = false;
						break;
					}
				}
			}
			if(!flag) {
				bootbox.alert($.i18n.prop("system.notice.delete.status.error"));
			} else {
				bootbox.confirm($.i18n.prop("system.notice.delete.confirm"), function(result) {
					if(result) {
						var ajaxUrl = root+'/notice/delete.action?ids='+$ids;
						$.ajax({
							url : ajaxUrl, // 请求url
							type : "post", // 提交方式
							dataType : "json", // 数据类型
							success : function(data) { // 提交成功的回调函数
								if (data) {
									bootbox.success($.i18n.prop("system.notice.delete.success"));
									$table.bootstrapTable('refresh', {});
								} else {
									bootbox.error($.i18n.prop("system.notice.delete.error"));
									$table.bootstrapTable('refresh', {});
								}
							}
						});
					}
				});
			}
		}
	});
});