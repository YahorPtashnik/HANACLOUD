package com.leverx.leverxspringdemo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.leverx.leverxspringdemo.dao.oDataDao;
import com.leverx.leverxspringdemo.domain.Products;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;

@Service
public class ProductsService {
	@Autowired
	private oDataDao oDataDao;

	public List<Products> getProductAll() throws ODataException {
		return oDataDao.getProductsOdata("XSOData");
	}
}