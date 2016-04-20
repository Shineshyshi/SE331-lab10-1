package camt.se331.shoppingcart.entity.transfer;

/**
 * Created by Shine on 20/4/2559.
 */

public class TokenTransfer {
    private final String token;
    public TokenTransfer(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
