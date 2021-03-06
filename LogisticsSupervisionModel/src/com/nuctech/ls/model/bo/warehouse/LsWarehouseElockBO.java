package com.nuctech.ls.model.bo.warehouse;

import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;



/**
 * 业务对象处理的实体-[关锁表]
 *
 * @author： nuctech
 */
@Entity
@Table(name = "LS_WAREHOUSE_ELOCK")
public class LsWarehouseElockBO {
	/**
	 * 缺省的构造函数
	 */
	public LsWarehouseElockBO() {
		super();
	}

	/* 关锁主键 */
	private String elockId;

	/* 关锁号 */
	private String elockNumber;

	/* 所属节点 */
	private String belongTo;

	/* SIM卡号,多个用逗号分开 */
	private String simCard;

	/* 信息上传频率 */
	private String interval;

	/* 网关地址 */
	private String gatewayAddress;

	/*
	 * 关锁状态 维修、损坏、报废等
	 */
	private String elockStatus;

	/* 创建人 */
	private String createUser;

	/* 创建时间 */
	private Date createTime;

	/* 更新人员 */
	private String updateUser;

	/* 更新时间 */
	private Date updateTime;

	@Id
	@Column(name = "ELOCK_ID", nullable = false, length = 50)
	public String getElockId() {
		return this.elockId;
	}

	public void setElockId(String elockId) {
		this.elockId = elockId;
	}

	@Column(name = "ELOCK_NUMBER", nullable = true, length = 50)
	public String getElockNumber() {
		return this.elockNumber;
	}

	public void setElockNumber(String elockNumber) {
		this.elockNumber = elockNumber;
	}

	@Column(name = "BELONG_TO", nullable = true, length = 50)
	public String getBelongTo() {
		return this.belongTo;
	}

	public void setBelongTo(String belongTo) {
		this.belongTo = belongTo;
	}

	@Column(name = "SIM_CARD", nullable = true, length = 100)
	public String getSimCard() {
		return this.simCard;
	}

	public void setSimCard(String simCard) {
		this.simCard = simCard;
	}

	@Column(name = "INTERVAL", nullable = true, length = 20)
	public String getInterval() {
		return this.interval;
	}

	public void setInterval(String interval) {
		this.interval = interval;
	}

	@Column(name = "GATEWAY_ADDRESS", nullable = true, length = 20)
	public String getGatewayAddress() {
		return this.gatewayAddress;
	}

	public void setGatewayAddress(String gatewayAddress) {
		this.gatewayAddress = gatewayAddress;
	}

	@Column(name = "ELOCK_STATUS", nullable = true, length = 2)
	public String getElockStatus() {
		return this.elockStatus;
	}

	public void setElockStatus(String elockStatus) {
		this.elockStatus = elockStatus;
	}

	@Column(name = "CREATE_USER", nullable = true, length = 50)
	public String getCreateUser() {
		return this.createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	
	@Column(name = "CREATE_TIME", nullable = true)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "UPDATE_USER", nullable = true, length = 50)
	public String getUpdateUser() {
		return this.updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	
	@Column(name = "UPDATE_TIME", nullable = true)
	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
