package camt.se331.shoppingcart.service;

import camt.se331.shoppingcart.entity.User;

import java.util.List;

/**
 * Created by Shine on 20/4/2559.
 */
public interface UserService {
    public List<User> findAll();
    public User findByUserName(String username);
}
