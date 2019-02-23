package com.leverx.leverxspringdemo.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IProductDao;
import com.leverx.leverxspringdemo.domain.Products;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;

@Repository
public class oDataDao implements IProductDao {

	 public List<Products> getProductsOdata(String destinationName) throws ODataException {
	        ODataQueryResult  result = ODataQueryBuilder.withEntity("/V2/OData/OData.svc/","Products").
	                select("ID","Name","Description").build().execute(destinationName);
	        List<Map<String,Object>> listMap =  result.asListOfMaps();
	        return  getProductList(listMap);
	 }
	 public List<Products>  getProductList ( List<Map<String,Object>> listMap) {
	    List <Products> productsList = new ArrayList<>();
	    listMap.forEach(item->{
	        Products prod = new Products();
	        prod.setId(Integer.parseInt(item.get("ID").toString()));
	        prod.setName(item.get("Name").toString());
	        prod.setDescription(item.get("Description").toString());
	        productsList.add(prod);
	    });
	    return productsList;
	}
	 @Override
	 public Optional<Products> getById(String id) {
	  // TODO Auto-generated method stub
	  return null;
	 }
	 @Override
	 public List<Products> getAll() {
	  // TODO Auto-generated method stub
	  return null;
	 }
	 @Override
	 public void save(Products entity) throws SQLException {
	  // TODO Auto-generated method stub
	  
	 }
	 @Override
	 public void delete(String id) {
	  // TODO Auto-generated method stub
	  
	 }
	 @Override
	 public void update(Products entity) {
	  // TODO Auto-generated method stub
	  
	 }
}
