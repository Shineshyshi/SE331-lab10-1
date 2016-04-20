package camt.se331.shoppingcart.entity.transfer;

import java.util.Map;

/**
 * Created by Shine on 20/4/2559.
 */
public class UserTransfer {
    private final String name;
    private final Map<String, Boolean> roles;

    public UserTransfer(String name, Map<String, Boolean> roles) {
        this.name = name;
        this.roles = roles;
    }

    public Map<String, Boolean> getRoles() {
        return roles;
    }

    public String getName() {
        return name;
    }
}
