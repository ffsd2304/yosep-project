package com.yosep.myweb.product.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> getProductList(Map<String, Object> params) {
        return productMapper.getProductList(params);
    }
}
