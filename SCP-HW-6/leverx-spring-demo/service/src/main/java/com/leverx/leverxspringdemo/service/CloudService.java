package com.leverx.leverxspringdemo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sap.cloud.sdk.cloudplatform.CloudPlatform;
import com.sap.cloud.sdk.cloudplatform.connectivity.DestinationAccessor;
import com.sap.cloud.sdk.cloudplatform.connectivity.GenericDestination;
import com.leverx.leverxspringdemo.domain.Destination;
import com.leverx.leverxspringdemo.domain.Props;

@Service
public class CloudService {

	@Autowired
	private CloudPlatform platform;

	public String getApplicationName() {
		return platform.getApplicationName();
	}

	public List<Destination> getDestinations() {
		List<Destination> destinationList = new ArrayList<Destination>();
		Map<String, GenericDestination> destinationMap = DestinationAccessor.getGenericDestinationsByName();
		destinationMap.forEach((key, value) -> {
			Destination destination = new Destination();
			destination.setName(value.getName());
			destination.setDescription(value.getDescription().orElseGet(() -> {
				return "No description";
			}));
			destination.setDestinationType(value.getDestinationType().toString());
			Map<String, String> propertyMap = value.getPropertiesByName();
			List<Props> propsList = new ArrayList<Props>();
			propertyMap.forEach((name, data) -> {
				Props props = new Props();
				props.setName(name);
				props.setValue(data);
				propsList.add(props);
			});
			destination.setPropsList(propsList);
			destinationList.add(destination);
		});
		return destinationList;
	}
}
